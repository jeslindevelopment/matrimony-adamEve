import { Step, Stepper } from "react-form-stepper";
import { color } from "../../assets/css/color/color";
import { useEffect, useState } from "react";
import { UserContext } from "../../component/userContext";
import BasicInfo from "./subComponent/basicInfo";
import PersonalInfo from "./subComponent/personalInfo";
import FamilyInfo from "./subComponent/familyInfo";
import ChurchInfo from "./subComponent/churchInfo";
import Details from "./subComponent/details";
import { useDispatch } from "react-redux";
import { getUserDetail } from "../../store/slice/auth";
const ProfileSetting = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetail());
  }, []);
  const handleStepper = () => {
    if (activeStep === 0) {
      return <BasicInfo />;
    }
    if (activeStep === 1) {
      return <PersonalInfo />;
    }
    if (activeStep === 2) {
      return <FamilyInfo />;
    }
    if (activeStep === 3) {
      return <ChurchInfo />;
    }
    if (activeStep === 4) {
      return <Details />;
    }
  };
  const handleNext = () => setActiveStep(activeStep + 1);
  const handlePrevious = () => setActiveStep(activeStep - 1);
  const handleSave = () => {};
  console.log("formdata", formData);
  return (
    <section
      className="py-4 "
      style={{ background: color.formBG, minHeight: "88vh" }}
    >
      <div
        className="auto-container bg-white rounded-4"
        // style={{ backgroundColor: color.modalBG }}
      >
        <Stepper
          activeStep={activeStep}
          connectorStateColors={true}
          connectorStyleConfig={{
            completedColor: color.hightLightColor,
            activeColor: color.hightLightColor,
            disabledColor: "#b99a4570",
          }}
          styleConfig={{
            activeBgColor: color.hightLightColor,
            completedBgColor: color.hightLightColor,
            inactiveBgColor: "#b99a4570",
            activeTextColor: "white",
            completedTextColor: "white",
            inactiveTextColor: "white",
          }}
        >
          <Step label={<div className="fs-6 fw-bold">Basic Info</div>} />
          <Step label={<div className="fs-6 fw-bold">Personal Info</div>} />
          <Step label={<div className="fs-6 fw-bold">Family Info</div>} />
          <Step label={<div className="fs-6 fw-bold">Church Info</div>} />
          <Step label={<div className="fs-6 fw-bold">Details</div>} />
        </Stepper>
        <UserContext.Provider
          value={{
            setFormData,
            formData,
            handleNext,
            handlePrevious,
            handleSave,
          }}
        >
          <div className="p-lg-4">{handleStepper()}</div>
        </UserContext.Provider>
      </div>
    </section>
  );
};

export default ProfileSetting;
