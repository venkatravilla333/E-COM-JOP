

export class ApiFunctionality {
  constructor(query, queryStr) {
    this.query = query,
    this.queryStr = queryStr
   
  }

  search() {
    let keyword = this.queryStr.keyword ? {
      name: {
        $regex: this.queryStr.keyword,
        $options: 'i'  
      },
      
    } : {} 
    this.query = this.query.find(keyword)
    return this
    
  }

  filter() {
    const queryObj = { ...this.queryStr };
    console.log(queryObj)
    const excludeFields = ['page', 'limit', 'sort', 'keyword'];
    excludeFields.forEach((value) => delete queryObj[value]);
    console.log(queryObj)
    this.query = this.query.find(queryObj)
    return this
  }

  paginate(resPerPage) {
    const pageNum = Number(this.queryStr.page) || 1;
    const skipItems = (pageNum - 1) * resPerPage;
    this.query = this.query.skip(skipItems).limit(resPerPage);
    return this;
  }

}