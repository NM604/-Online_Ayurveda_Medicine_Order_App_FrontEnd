import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function MedicineAdd() {
  const [formValues, setFormValues] = useState({
    categoryDTO: { categoryName: "" },
    companyName: "",
    expiryDate: "",
    medicineCost: 0,
    medicineName: "",
    mfd: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [categoryNameList, setCategoryNameList] = useState([{}]);
  const [categoryName, setCategoryName] = useState();

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/oam/userinterface/category"
      );
      setCategoryNameList(response.data);
      console.log(response.data);
    } catch (err) {
      setFormErrors(err);
    }
  };

  // const handleCategory = (e) => {
  //   let value = Array.from(e.target.selectedOptions, option => option.value);
  //   this.setState({values: value});
  // }
  const onChangeCategory = (e) =>{
    // const newdata = {...formValues};
    setFormValues({
      ...formValues,
      categoryDTO: {
        ...formValues.categoryDTO.categoryName,
        [e.target.name] : e.target.value
      }
    });

  }
  const handleChange = (e) => {
    const newdata  = {...formValues};
    newdata[e.target.name] = e.target.value;
    setFormValues(newdata);
    console.log(newdata);

  }



  // const handleChange = (level) => (e) => {
  //   if (!level) {
  //     const newdata = { ...formValues };
  //     newdata[e.target.name] = e.target.value;
  //     setFormValues(newdata);
  //     console.log(newdata);
  //   } else {
  //     setFormValues({
  //       ...formValues,
  //       [level]: {
  //         ...formValues[level],
  //         [e.target.name]: e.target.value,
  //       },
  //     });
  //   }
  // };

  //   // const { name, value } = e.target;
  //   // setFormValues({ ...formValues, [name]: value });
  //   // console.log(formValues);
  // };

  const addmed = async () => {
    try {
      await axios
        .post("http://localhost:8080/oam/userinterface/medicine", {
          categoryDTO: formValues.categoryDTO,
          companyName: formValues.companyName,
          expiryDate: formValues.expiryDate,
          medicineCost: formValues.medicineCost,
          medicineName: formValues.medicineName,
          mfd: formValues.mfd,
        })
        .then((res) => console.log(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    addmed();
    console.log("added!!!");
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.medicineName) {
      errors.medicineName = "medicine name is required!";
    }
    if (!values.companyName) {
      errors.companyName = "company name is required!";
    }
    if (!values.mfd) {
      errors.mfd = "manufacturing date is required!";
    }
    if (!values.expiryDate) {
      errors.expiryDate = "expiary date is required!";
    }
    if (!values.medicineCost) {
      errors.medicineCost = "medicine cost is required!";
    }
    return errors;
  };

  return (
    <div>
      MedicineAdd
      <form onSubmit={handleSubmit}>
        <h1>Add medicine</h1>
        <div className="ui divider"></div>
        <div className="field">
            <label>Choose Category</label>
            <select
              name="categoryName"
              value={formValues.categoryDTO.categoryName}
              onChange={onChangeCategory}
            >
              <option value="">Choose Category</option>
              {categoryNameList.map((category) => (
                <option value={category.categoryName} key={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
        <div className="ui form">
          <div className="field">
            <label>Medicine Name</label>
            <input
              type="text"
              name="medicineName"
              placeholder="Medicine Name"
              value={formValues.medicineName}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.medicineName}</p>
          <div className="field">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formValues.companyName}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.companyName}</p>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Medicine Cost</label>
            <input
              type="text"
              name="medicineCost"
              placeholder="Medicine Cost"
              value={formValues.medicineCost}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.medicineCost}</p>
          <div className="field">
            <label>Manufacturing Date</label>
            <input
              type="date"
              name="mfd"
              placeholder="Manufacturing Date"
              value={formValues.mfd}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.mfd}</p>
          <div className="field">
            <label>Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              placeholder="Expiry Date"
              value={formValues.expiryDate}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.expiryDate}</p>
          {/* <div className="field">
            <label>Choose Category</label>
            <select
              name="categoryName"
              value={formValues.categoryDTO.categoryName}
              onChange={onChangeCategory}
            >
              <option value="">Choose Category</option>
              {categoryNameList.map((category) => (
                <option value={category.categoryName} key={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div> */}

          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default MedicineAdd;
