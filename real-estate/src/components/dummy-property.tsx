import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Swal from "sweetalert2";
import { Property } from "../pages/property/type";
import { useRouter } from "next/router";

interface DummyPropertyProps {
  properties: any[];
}

const DummyProperty = ({ properties }: DummyPropertyProps) => {
  // State for storing properties
  let [itemList, setItemList] = useState<Property[]>([]);
  const router = useRouter();

  // Function to fetch properties from the API
  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PROPERTY_VIEW_ALL_URL}`
      );
      setItemList(response.data); // Update state with fetched properties
    } catch (error) {
      console.error("Error fetching properties:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Fetch Properties",
        text: "Unable to fetch property list. Please try again later.",
      });
    }
  };

  // Use effect to fetch properties on component mount and when router query changes
  useEffect(() => {
    fetchProperties();
  }, [router.query]);

  // Function to navigate to contact page with agent ID
  const addContact = (agentId: string) => {
    router.push({
      pathname: "/contact",
      query: { agentId },
    });
  };

  // Function to mark a property as favorite
  const handleMarkAsFavorite = async (propertyId: string) => {
    const userId =
      typeof window !== "undefined" ? localStorage.getItem("userId") : null;

    if (!userId) {
      Swal.fire({
        icon: "warning",
        title: "Not Logged In",
        text: "Please log in to mark properties as favorites.",
      });
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_PROPERTY_FAVORITE_URL}`,
        { propertyId, userId },
        { headers: { token: localStorage.getItem("token") || "" } }
      );
      Swal.fire({
        icon: "success",
        title: "Added to Favorites",
        text: "Property added to favorites!",
      });
    } catch (error) {
      console.error("Error marking property as favorite:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Add to Favorites",
        text: "Failed to mark property as favorite. Please try again.",
      });
    }
  };

  if (properties.length) itemList = properties;

  // Render properties or a no-data image
  return (
    <div className="container-lg mt-5 p-4 mb-5 bg-light rounded">
      <h2 className="m-2 text-center">Available Properties</h2>
      <div className="row">
        {itemList.length === 0 ? (
          <div className="container d-flex justify-content-center align-items-center">
            <Image
              src="/public/images/NoData.jpg"
              alt="No data"
              width={400}
              height={400}
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          itemList.map((property) => (
            <div className="col-md-4 mb-4" key={property._id}>
              <div className="card shadow-sm border-light">
                <Image
                  src={property.images[0]}
                  alt={property.address || "Property Image"}
                  width={500}
                  height={200}
                  className="card-img-top"
                  style={{ objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{property.address}</h5>
                  <p className="card-text">Price: Rs. {property.price}</p>
                  <p className="card-text">
                    <strong>Description:</strong>{" "}
                    {property.description.length > 200
                      ? `${property.description.slice(0, 200)}...`
                      : property.description}
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleMarkAsFavorite(property._id)}
                  >
                    Add to Favorite
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DummyProperty;
