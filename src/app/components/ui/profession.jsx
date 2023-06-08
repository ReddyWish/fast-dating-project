import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getProfessions, getProfession, getProfessionsLoadingStatus, loadProfessions } from "../../store/professions";

const Profession = ({ id }) => {
    const dispatch = useDispatch();
    const professions = useSelector(getProfessions());
    const prof = getProfession(id, professions);
    const professionLoading = useSelector(getProfessionsLoadingStatus());
    useEffect(() => {
        dispatch(loadProfessions());
    }, []);
    if (!professionLoading) {
        return <p>{prof.name}</p>;
    } else return "Loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
