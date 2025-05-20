'use strict';

const BaseControllerCRUD = require('../../base/BaseControllerCRUD');
const CategoryService = require('./service');

class CategoryController extends BaseControllerCRUD {
  constructor() {
    super(new CategoryService());
  }

  async getCategoriesParent(request) {
    try {
      const {
        id
      } = request.params;
      return this.service.getCategoryParent(id)
    } catch (err) {
      throw err;
    }
  };

  async getManyProductOfCategory(request) {
    const { id } = request.params;
    try {
      return await this.service.getManyProductOfCategory(request.query, id);
    } catch (err) {
      throw err;
    }
  };

  

  async getCategoryTree(){
    try {
      const categoryService = new CategoryService()
      return await categoryService.getTree();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CategoryController;
