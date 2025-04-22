type SearchCondition = {
    OR: {
      [key: string]: {
        contains: string;
        mode: 'insensitive';
      };
    }[];
  };
  
  export class PrismaQueryBuilder<T> {
    private queryParams: Record<string, any>;
    private whereClause: any = {};
    private take: number = 10;
    private skip: number = 0;
  
    constructor(queryParams: Record<string, any>) {
      this.queryParams = queryParams;
    }
  
    search(searchableFields: (keyof T)[]) {
      const searchTerm = this.queryParams.searchTerm;
      if (searchTerm) {
        const orConditions: SearchCondition['OR'] = searchableFields.map((field) => ({
          [field as string]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        }));
        this.whereClause.OR = orConditions;
      }
      return this;
    }
  
    filter() {
      const excludedFields = ['page', 'limit', 'sortBy', 'sortOrder', 'searchTerm'];
      const filterFields = Object.keys(this.queryParams).filter((key) => !excludedFields.includes(key));
  
      filterFields.forEach((field) => {
        this.whereClause[field] = this.queryParams[field];
      });
  
      return this;
    }
  
    paginate() {
      const page = Number(this.queryParams.page) || 1;
      const limit = Number(this.queryParams.limit) || 10;
  
      this.take = limit;
      this.skip = (page - 1) * limit;
  
      return this;
    }
  
    build() {
      return {
        where: this.whereClause,
        take: this.take,
        skip: this.skip,
      };
    }
  
    // Optional: Meta info
    async getMeta(model: any) {
      const total = await model.count({ where: this.whereClause });
      const page = Number(this.queryParams.page) || 1;
      const limit = Number(this.queryParams.limit) || 10;
      const totalPages = Math.ceil(total / limit);
  
      return {
        total,
        page,
        limit,
        totalPages,
      };
    }
  }