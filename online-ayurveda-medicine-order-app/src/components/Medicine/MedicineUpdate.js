// import React, { useState ,useEffect} from 'react'
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Badge from "react-bootstrap/Badge";
// import Collapse from "react-bootstrap/Collapse";
// import axios from 'axios';
// import Card from '../UI/Card';


// function MedicineUpdate() {
//     const [open,setOpen] = useState(true);
//     const [medicines,setMedicines] = useState([{}]);
//     const [formValues, setFormValues] = useState({
//       categoryDTO: { categoryId: 1, categoryName: "hair" },
//       companyName: "",
//       expiryDate: "",
//       medicineCost: 0,
//       medicineName: "",
//       mfd: "",
//     });

//       const [formErrors,setFormErrors] = useState({});

//       const handleChange  = (e) =>{
//       const newdata  = {...formValues};
//     newdata[e.target.name] = e.target.value;
//     setFormValues(newdata);
//     console.log(newdata);
//       }
//       const handleSubmit = () =>{
        
//       }

//       const fetchMedicines = async () => {
//         try {
//           const response = await axios.get(
//             "http://localhost:8080/oam/userinterface/medicine"
//           );
//           setMedicines(response.data);
//           console.log(response);
//         } catch (err) {
//           setFormErrors(err);
//         }
//       };
    
//       useEffect(() => {
//         fetchMedicines();
//       }, []);

//   return (
//     <div>List of medicines
//       <div>
//         {
//           medicines.map((medicine)=>{
//             const { medicineId, medicineName, medicineCost, companyName , expiryDate, mfd} = medicine;
//             const medItem = {
//               medicineId: medicineId,
//               medicineName: medicineName,
//               price: medicineCost,
//               companyName: companyName,
//               expiryDate: expiryDate,
//               mfd: mfd
//             };
//             return(
//             <Card>
//             <div key={medicineId}>
//               <h1>{medicineName}</h1>
//               <h2>{companyName}</h2>
//               <h2>{medicineCost}</h2>
//               <span>From: {mfd} To: {expiryDate}</span>
//               <div className="buttons">
//           <Button
//             variant="warning"
//             onClick={() => setOpen(!open)}
//             aria-controls="example-collapse-text"
//             aria-expanded={open}
//           >
//             Update Medicine
//           </Button>
//         </div>
        
//         <Collapse in={open}>
//           <div id="example-collapse-text">
//             <Form>
//               <h2>
//                 Change values <Badge bg="success">Admin</Badge>
//               </h2>
//               <Form.Group className="mb-3" controlId="id">
//                 <Form.Label>AdminID</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="id"
//                   placeholder="Enter ID"
//                   value={formValues.id}
//                   onChange={handleChange}
//                 />
//                 <Form.Text className="text-muted">{formErrors.id}</Form.Text>
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="password">
//                 <Form.Label>Medicine name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="medicineName"
//                   placeholder="enter medicine name"
//                   value={formValues.medicineName}
//                   onChange={handleChange}
//                 />
//                 <Form.Text className="text-muted">
//                   {formErrors.password}
//                 </Form.Text>
//               </Form.Group>
//               <div className="buttons">
//                 <Button variant="primary" onClick={handleSubmit}>
//                   Submit
//                 </Button>
//               </div>
//             </Form>
//           </div>
//         </Collapse>

//             </div>
//           </Card>
//             )
//           })
//         };
//         {/* <div className="buttons">
//           <Button
//             variant="warning"
//             onClick={() => setOpen(!open)}
//             aria-controls="example-collapse-text"
//             aria-expanded={open}
//           >
//             Update Medicine
//           </Button>
//         </div>
        
//         <Collapse in={open}>
//           <div id="example-collapse-text">
//             <Form>
//               <h2>
//                 Change values <Badge bg="success">Admin</Badge>
//               </h2>
//               <Form.Group className="mb-3" controlId="id">
//                 <Form.Label>AdminID</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="id"
//                   placeholder="Enter ID"
//                   value={formValues.id}
//                   onChange={handleChange}
//                 />
//                 <Form.Text className="text-muted">{formErrors.id}</Form.Text>
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="password">
//                 <Form.Label>Medicine name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="medicineName"
//                   placeholder="enter medicine name"
//                   value={formValues.medicineName}
//                   onChange={handleChange}
//                 />
//                 <Form.Text className="text-muted">
//                   {formErrors.password}
//                 </Form.Text>
//               </Form.Group>
//               <div className="buttons">
//                 <Button variant="primary" onClick={handleSubmit}>
//                   Submit
//                 </Button>
//               </div>
//             </Form>
//           </div>
//         </Collapse> */}
//         </div>
//     </div>
//   )
// }

// export default MedicineUpdate
























import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Card from "../UI/Card";

const MedicineUpdate = () => {
  const [medicines, setMedicines] = useState([]);
  const [error, setError] = useState({});

  // axios.get("http://localhost:8080/oam/userinterface/medicine"
  const fetchMedicines = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/oam/userinterface/medicine"
      );
      setMedicines(response.data);
      console.log(response);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const deleteMedicine = async (medicineId) => {
    try{
        await axios.delete(
            `http://localhost:8080/oam/userinterface/medicine/${medicineId}`
          ).then((res)=>{console.log("deleted!!!",res)});
    }
    catch(error){
        console.log(error);
    }
  };
  const deleteHandler = (medicineId) => {

    deleteMedicine(medicineId);
    window.location.reload(false);
    

  };

  const updateHandler = (medicineId) => {
    // updateMedicine(medicineId);

  };

  return (
    <div className="productListing">
      <h1>All medicines</h1>
      {error && <h1>{error.message}</h1>}
      {medicines.map((post) => {
        const { medicineId, medicineName, medicineCost, companyName } = post;
        const medItem = {
          medicineId: medicineId,
          medicineName: medicineName,
       
          price: medicineCost,
        };
        return (
          <Card>
            <div key={medicineId}>
              <h1>{medicineName}</h1>
              <h2>{companyName}</h2>
              <h2>{medicineCost}</h2>
              
                <button type="button" onClick={()=>deleteHandler(medicineId)}>Delete</button>
                <Link to= {`/medicine-updateform/${medItem.medicineId}`}  ><button type="button" onClick={()=>updateHandler(medicineId)}>Update</button></Link>
              
            </div>
          </Card>
        );
      })}
      ;
    </div>
  );
};

export default MedicineUpdate;















// import axios from "axios";
// import React, { useEffect, useState } from "react";

// function MedicineUpdate() {
//   const [id, setId] = useState();

// //   useEffect(() => {
// //     fetchMedicine(11);
// //   }, []);

//   const fetchMedicine = async () => {

//     try {
//       axios
//         .get(`http://localhost:8080/oam/userinterface/medicine/${id}`)
//         .then((res) => console.log("fetched!!!", res.data));
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const handleInput = (e) => {
//     setId(e.target.value);
//   };

//   const fromHandler = (e) =>{
//     e.preventDefault();
    
//   }
//   return (
//     <div>
//       {/* <div>MedicineUpdate</div> */}
//       <form onSubmit={fromHandler}>
//         <label >Enter Medicine Id</label>
//           <input type="text" placeholder="medicine Id" onChange={handleInput}
//           ></input>
//           <button className="fluid ui button blue" onClick={fetchMedicine}>search</button>
        
//       </form>
//     </div>
//   );
// }

// export default MedicineUpdate;
