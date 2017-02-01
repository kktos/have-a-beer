/*
  Not enough time to master flux/redux so let's do it the "express" way
*/
class ExpressApp {
  constructor() {
    this._vars= {};
  }

  get(varname) {
    return this._vars[varname];
  }

  set(varname, varvalue) {
    this._vars[varname]= varvalue;
    return this;
  }
}

global.app= new ExpressApp();