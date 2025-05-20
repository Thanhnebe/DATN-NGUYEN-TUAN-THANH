import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { actFetchCategoryTreeRequest } from "../../../redux/actions/category";
import { useDispatch, useSelector } from "react-redux";

function Category() {
  const history = useHistory();
  const categories = useSelector((state) => state.categories || []);
  const mapCategories = useCallback((categories) => {
    return categories.map((category) => {
      const children = category.children
        ? mapCategories(category.children)
        : [];
      const hasChildren = !!children.length;
      const newCategory = {
        key: category.id,
        label: category.nameCategory,
        ...(hasChildren && { children, type: "Submenu" }),
      };
      return newCategory;
    });
  }, []);
  const mapDataCategories = mapCategories(categories);
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const timeOutMouseEnter = useRef(null);

  const clearTimeOutShowOffSubCategory = () => {
    if (timeOutMouseEnter.current) {
      clearTimeout(timeOutMouseEnter.current);
    }
  };

  const onMouseOutCategory = () => {
    clearTimeOutShowOffSubCategory();
    timeOutMouseEnter.current = setTimeout(() => {
      setSelectedCategory("");
      setShowSubCategory(false);
    }, 300);
  };

  const onMouseInCategory = (item) => {
    clearTimeOutShowOffSubCategory();
    setShowSubCategory(true);
    item && setSelectedCategory(item);
  };

  const subCategories = useMemo(() => {
    return selectedCategory?.children || [];
  }, [selectedCategory]);

  useEffect(() => {
    dispatch(actFetchCategoryTreeRequest());
  }, [dispatch]);

  return (
    <div
      className="list-category"
      onMouseLeave={() => {
        onMouseOutCategory();
      }}
    >
      <div className="list-parent-category">
        {mapDataCategories.map((item) => (
          <div
            key={item.key}
            className="each-category"
            onMouseEnter={() => {
              onMouseInCategory(item);
            }}
            onClick={() => history.push(`/categories/${item.key}`)}
          >
            {item.label}
          </div>
        ))}
      </div>
      {showSubCategory && (
        <div
          className="list-subCategory"
          onMouseEnter={() => onMouseInCategory()}
        >
          {subCategories.map((item) => (
            <SubCategory key={item.key} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

const SubCategory = ({ item }) => {
  const history = useHistory();
  return (
    <div className="subCategory-container">
      <p
        className="subCategory-label"
        onClick={() => history.push(`/categories/${item.key}`)}
      >
        {item.label}
      </p>
      {!!item.children?.length && (
        <div className="subCategory-listChild">
          {item.children.slice(0, 5).map((child) => (
            <div
              key={child.key}
              className="subCategory-child-label"
              onClick={() => history.push(`/categories/${child.key}`)}
            >
              {child.label}
            </div>
          ))}
          {item.children.length > 5 && (
            <div
              className="subCategory-child-viewAll"
              onClick={() => history.push(`/categories/${item.key}`)}
            >{`Xem tất cả >`}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Category;
