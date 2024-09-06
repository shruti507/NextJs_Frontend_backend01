import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import noproperty from "../../../public/images/NoProperty.png"; // Adjust path if needed
import Header from "../../components/header"; // Adjust path if needed
import { useRouter } from "next/router";
import Image from "next/image";

// Define types for the property data
interface Property {
  _id: string;
  address: string;
  price: number;
  description: string;
  contactInfo: string;
  images: string[];
}

export default function UserProperty() {
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const [properties, setProperties] = useState<Property[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editData, setEditData] = useState<Property | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      axios
        .post(`${process.env.NEXT_PUBLIC_PROPERTY_VIEW_USER_URL}`,{userId:userId})
        .then(result => setProperties(result.data))
        .catch(err => console.error(err));
    }
  }, [userId]);

  const handleEdit = (data: Property) => {
    setEditData(data);
    setIsEditing(true);
  };

  const handleDelete = (data: Property) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        axios
  .delete(`http://localhost:3000/properties/removeProperty/${data._id}`)
  .then(() => {
    Swal.fire("Deleted!", "Your property has been deleted.", "success");
    setProperties(properties.filter(item => item._id !== data._id));
  })
  .catch(err => {
    Swal.fire("Error!", "There was a problem deleting the property.", "error");
    console.error(err);
  });

      }
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData(prevData => {
      if (prevData) {
        return { ...prevData, [name]: value };
      }
      return null;
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editData) {
      axios
        .put(`http://localhost:3000/properties/updateProperty/${editData._id}`, editData)
        .then(response => {
          Swal.fire("Updated!", "The property has been updated.", "success");
          setProperties(properties.map(p => (p._id === editData._id ? response.data : p)));
          setIsEditing(false);
        })
        .catch(error => {
          Swal.fire("Error!", "There was a problem updating the property.", "error");
          console.error(error);
        });
    }
  };

  return (
    <>
      <header />
      {properties.length > 0 ? (
        <section>
          <h1 className="text-center">User Properties...</h1>
          <div className="container-fluid p-2 border">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <h2>Edit Property</h2>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={editData?.address || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={editData?.price || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={editData?.description || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contact Info</label>
                  <input
                    type="text"
                    className="form-control"
                    name="contactInfo"
                    value={editData?.contactInfo || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Update Property</button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <table className="table m-auto border" style={{ width: "90%" }}>
                <thead>
                  <tr className="border">
                    <th style={{ width: "100px" }}>Sr. No.</th>
                    <th>Property Image</th>
                    <th>Address</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Contact</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((data, index) => (
                    <tr key={data._id} className="border">
                      <td>{index + 1}</td>
                      <td>
                        {data.images[0] ? (
                          <Image
                          src={data.images[0]} // Assuming the first image is used as the thumbnail
                          className="card-img-top"
                          alt={data.address}
                          width={200}
                          height={200}
                          style={{ objectFit: 'cover' }}
                        />
                        ) : (
                          <Image
                            src={noproperty}
                            alt="No Property"
                            width={1000}
                            height={1000}
                          />
                        )}
                      </td>
                      <td>{data.address}</td>
                      <td>{data.price}</td>
                      <td>{data.description}</td>
                      <td>{data.contactInfo}</td>
                      <td>
                        <span onClick={() => handleEdit(data)} style={{ cursor: "pointer" }}>
                          <FaEdit size={20} color="blue" />
                        </span>
                      </td>
                      <td>
                        <span onClick={() => handleDelete(data)} style={{ cursor: "pointer" }}>
                          <FaTrash size={20} color="red" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      ) : (
        <section className="d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh" }}>
          <Image style={{ width: "400px", height: "400px" }} src={noproperty} alt="No Properties" />
          <button onClick={() => router.push("/property/add-property")} className="btn btn-primary">
            Add property
          </button>
        </section>
      )}
    </>
  );
}
