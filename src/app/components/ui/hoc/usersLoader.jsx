import { getDataStatus, loadUsersList } from "../../../store/users";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useEffect } from "react";

const UsersLoader = ({ children }) => {
  const dataStatus = useSelector(getDataStatus());
  const dispatch = useDispatch();
  useEffect(() => {
    if (!dataStatus) dispatch(loadUsersList());
  }, []);
  if (!dataStatus) return "loading...";
  return children;
};

UsersLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node),
  PropTypes.node
  ])
};

export default UsersLoader;
