import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ThreeFData } from "./ThreeFieldsMaster";
import { Icon } from "@iconify/react";
import axios from "axios";

const ViewThreeF = ({ visible, onClick, edit, ID }) => {
    const [StatusCheck, setStatusCheck] = useState(false);
    const [details, setDetails] = useState([]);
    const formik = useFormik({
        initialValues: {
            masterName: "",
            fieldDetails1: "",
            fieldDetails2: "",
            status: "",
            remark: "",
        },
        onSubmit: (values) => {
            console.log(values);
            updateField(values);
        },
    });

    const updateField = async (values) => {
        try {
            const response = axios.patch(`http://localhost:5500/threefieldmaster/update/${ID}`, values);
            console.log("Patch successful");
        } catch (error) {
            console.log("Error in patch ", error);
        }
    }

    useEffect(() => {
        fetchFieldData()
    }, [ID]);

    const fetchFieldData = async () => {
        try {
            const response = await axios.get(`http://localhost:5500/threefieldmaster/${ID}`);
            const data = response.data;
            setDetails(data.FieldByID);
        } catch (error) {
            console.log("Error while fetching course data: ", error.message);
        }
    }

    if (!visible) return null;
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
                <div className="bg-gray-200 w-[60%] p-8 rounded-lg max-h-[80%] overflow-y-scroll">
                    <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
                        <p className="text-white text-[13px] font-semibold">
                            Three Fields Master
                        </p>
                        <Icon
                            icon="maki:cross"
                            color="white"
                            className="cursor-pointer"
                            onClick={onClick}
                        />
                    </div>
                    <div className="py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[13px] font-semibold">Field ID</p>
                                <input
                                    id="id"
                                    type="number"
                                    placeholder="Enter Field ID"
                                    value={details?.id}
                                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                                    onChange={formik.handleChange}
                                    disabled={!edit}
                                />
                            </div>
                            <div>
                                <p className="text-[13px] font-semibold">Master Name</p>
                                <input
                                    id="masterName"
                                    type="text"
                                    placeholder="Enter Master Name"
                                    value={details?.masterName}
                                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                                    onChange={formik.handleChange}
                                    disabled={!edit}
                                />
                            </div>
                            <div>
                                <p className="text-[13px] font-semibold">Field Details 1</p>
                                <input
                                    id="fieldDetails1"
                                    type="text"
                                    placeholder="Enter Field Details 1"
                                    value={details?.fieldDetails1}
                                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                                    onChange={formik.handleChange}
                                    disabled={!edit}
                                />
                            </div>
                            <div>
                                <p className="text-[13px] font-semibold">Field Details 2</p>
                                <input
                                    id="fieldDetails2"
                                    type="text"
                                    placeholder="Enter Field Details 2"
                                    value={details?.fieldDetails2}
                                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                                    onChange={formik.handleChange}
                                    disabled={!edit}
                                />
                            </div>
                            <div>
                                <p className="text-[13px] font-semibold">Remarks</p>
                                <input
                                    id="remark"
                                    type="text"
                                    placeholder="Enter Remarks"
                                    value={details?.remark}
                                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                                    onChange={formik.handleChange}
                                    disabled={!edit}
                                />
                            </div>
                            <div>
                                <p className="text-[13px] font-semibold">Status</p>
                                <div className="flex items-center">
                                    <input
                                        id="status"
                                        type="checkbox"
                                        checked={details?.status}
                                        className={`relative w-4 h-4 mr-2 peer shrink-0 checked:appearance-none checked:bg-blue-900 border-2 border-blue-900 rounded-sm`}
                                        onChange={() => setStatusCheck(!StatusCheck)}
                                        disabled={!edit}
                                    />
                                    <Icon
                                        className="absolute w-4 h-4 hidden peer-checked:block"
                                        icon="gg:check"
                                        color="white"
                                    />
                                    <label for="status" className="text-[11px] font-semibold">
                                        Active
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-10 justify-center">
                        <button
                            type="submit"
                            className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
                        >
                            Save
                        </button>
                        <button
                            className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
                            onClick={onClick}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ViewThreeF;
