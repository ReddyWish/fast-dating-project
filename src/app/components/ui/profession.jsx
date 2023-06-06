import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getProfessions, getProfessionsLoadingStatus, loadProfessions } from "../../store/professions";

const Profession = ({ id }) => {
    const dispatch = useDispatch();
    const professions = useSelector(getProfessions());
    const prof = getProfession(id);
    const professionLoading = useSelector(getProfessionsLoadingStatus());
    useEffect(() => {
        dispatch(loadProfessions());
    }, []);
    function getProfession(id) {
        return professions.find((p) => p._id === id);
     }
    if (!professionLoading) {
        return <p>{prof.name}</p>;
    } else return "Loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
