import React, { useCallback, useEffect, useRef } from "react";
import { Menu as MenuAntd } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actFetchCategoryTreeRequest } from "../../redux/actions/category";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { doneLoading, startLoading } from "../../utils/loading";
import { actGetProductOfCategoryRequest } from "../../redux/actions/products";
import { actFetchProducersRequest } from "../../redux/actions/producer";

function Menu({ hiddenMenu }) {
  const history = useHistory();
  const categories = useSelector((state) => state.categories || []);
  const dispatch = useDispatch();
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

  const mapDateCategories = mapCategories(categories);
  const menuRef = useRef();

  const onClick = (e) => {
    history.push(`/categories/${e.key}`);
    getIdCategory(e.key);
    hiddenMenu && hiddenMenu();
  };

  const getIdCategory = async (id) => {
    startLoading();
    await Promise.all([
      dispatch(actGetProductOfCategoryRequest(id)),
      dispatch(actFetchProducersRequest(id)),
    ]);

    doneLoading();
  };

  useEffect(() => {
    dispatch(actFetchCategoryTreeRequest());
  }, [dispatch]);

  const watchClick = useCallback((e) => {
    if (!menuRef.current?.contains(e.target)) {
      hiddenMenu && hiddenMenu();
    }
  }, [hiddenMenu])

  useEffect(() => {
    document.addEventListener("click", watchClick);

    return () => document.removeEventListener("click", watchClick)
  }, [hiddenMenu, watchClick]);

  return (
    <div className="menu-container" ref={menuRef}Í>
      <MenuAntd
        onClick={onClick}
        style={{ width: 256 }}
        mode="vertical"
        items={mapDateCategories}
        sub
        
      />
    </div>
  );
}

export default Menu;
