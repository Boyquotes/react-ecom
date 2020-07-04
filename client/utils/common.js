import jwt from "jsonwebtoken";
import * as moment from "moment-timezone";

export const getChildCategories = (allCategories, parentCategory) => {
  let newParentCate = [];
  parentCategory.forEach((parentCate) => {
    let parentCategoryElements = { ...parentCate };
    let childCate = [];
    allCategories.forEach((allCate) => {
      if (allCate.parent === parentCate._id) {
        childCate.push(allCate);
      }
    });
    parentCategoryElements.childCate = childCate;
    newParentCate.push(parentCategoryElements);
  });
  return newParentCate;
};

export const isTokenExpired = (token) => {
  if (token) {
    const { exp } = jwt.decode(token);

    if (exp < (new Date().getTime() + 1) / 1000) {
      return true;
    }
    return false;
  }
  return false;
};

export const getUserInfo = (token) => {
  let data = "";
  if (token) {
    data = jwt.decode(token);
    return data;
  }
  return data;
};

export const convertDateToCurrentTz = (date) => {
  const currentTimeZone = moment.tz.guess();
  return moment.utc(date).tz(currentTimeZone).format("Do MMMM, YYYY");
};

export const getFilterAppendBody = (body, props, filter, type) => {
  console.log(filter, type)
  console.log(_.isEmpty(filter))
  let pathName = props.router.pathname.split("/")[1];
  if (_.isEmpty(body)) {
    if (pathName === "search") {
      if (_.isEmpty(filter)) {
        body = {
          keyword: props.router.query.slug,
        };
      } else {
        body = {
          keyword: props.router.query.slug,
          [type]: filter,
        };
      }
    } else if (pathName === "category") {
      if (_.isEmpty(filter)) {
        body = {
          cat_id: props.router.query.cate,
        };
      } else {
        body = {
          cat_id: props.router.query.cate,
          [type]: filter,
        };
      }
    }
  } else {
    if (pathName === "search") {
      if (_.isEmpty(filter)) {
        delete body[type];
      } else {
        body = {
          ...body,
          [type]: filter,
        };
      }
    } else if (pathName === "category") {
      if (_.isEmpty(filter)) {
        delete body[type];
      } else {
        body = {
          ...body,
          [type]: filter,
        };
      }
    }
  }

  return body;
};

export const getBrandOptions = (data) => {
  let brandOptions = [];
  data.brands &&
    data.brands.length > 0 &&
    data.brands.map((brand) => {
      let ele = { label: brand.brandName, value: brand._id };
      brandOptions.push(ele);
    });
  return brandOptions;
};

export const getColorOptions = (data) => {
  let colorOptions = [];
  data &&
    data.colors &&
    data.colors.length > 0 &&
    data.colors.map((color) => {
      let ele = { label: color, value: color };
      colorOptions.push(ele);
    });
  return colorOptions;
};
