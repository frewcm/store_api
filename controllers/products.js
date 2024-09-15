import Product from "../models/product.js";

const getAllProducts = async (req, res) => {
  // filter
  const { name, createdAt, company, featured, sort, select, numericFilter } =
    req.query;

  const queryObject = {};

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (createdAt) {
    queryObject.createdAt = createdAt;
  }
  if (company) {
    queryObject.company = { $regex: company, $options: "i" };
  }
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  // numeric filter
  if (numericFilter) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "-": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const reqEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilter.replace(
      reqEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(queryObject);
  let result = Product.find(queryObject);

  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // field selection
  if (select) {
    const selectList = select.split(",").join(" ");
    result = result.select(selectList);
  }

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res
    .status(200)
    .json({ query: queryObject, amount: products.length, products: products });
};

export { getAllProducts };
