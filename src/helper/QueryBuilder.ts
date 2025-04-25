class QueryBuilder {
    private model: any;
    private query: Record<string, any>;
    private prismaOptions: any = {};

    constructor(model: any, query: Record<string, any>) {
        this.model = model;
        this.query = query;
    }

    search(searchableFields: string[]) {
        if (this.query?.searchTerm) {
            this.prismaOptions.where = {
                OR: searchableFields.map(field => ({
                    [field]: {
                        contains: this.query.searchTerm,
                        mode: 'insensitive'
                    }
                }))
            };
        }
        return this;
    }

    filter() {
        const queryObj = { ...this.query };
        const excludedFields = ['page', 'limit', 'sortBy', 'sortOrder', 'searchTerm'];
        excludedFields.forEach(el => delete queryObj[el]);

        if (Object.keys(queryObj).length > 0) {
            this.prismaOptions.where = {
                ...this.prismaOptions.where,
                ...queryObj
            };
        }
        return this;
    }

    sort(defaultField: string = 'createdAt') {
        const sortBy = this.query.sortBy || defaultField;
        const sortOrder = this.query.sortOrder || 'desc';

        this.prismaOptions.orderBy = {
            [sortBy]: sortOrder
        };
        return this;
    }

    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const skip = (page - 1) * limit;

        this.prismaOptions.skip = skip;
        this.prismaOptions.take = limit;
        return this;
    }

    async execute() {
        const [data, total] = await Promise.all([
            this.model.findMany(this.prismaOptions),
            this.model.count({ where: this.prismaOptions.where })
        ]);

        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const totalPage = Math.ceil(total / limit);

        return {
            meta: {
                total,
                totalPage,
                page,
                limit
            },
            data

        };
    }
}

export default QueryBuilder