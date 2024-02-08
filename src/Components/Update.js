import axios from "axios";
import React, { useEffect, useState } from "react";
import imageLogo from "../assets/imageLogo.jpg";
import loader from "../assets/logo.webp";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [category, setCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(imageLogo);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");

  let navigate = useNavigate();
  let params = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/category/" + params.id)
      .then((res) => {
        setLoading(false);
        setHasError(false);
        setCategory(res.data.category.name);
        setImageUrl(res.data.category.photo);
      })
      .catch((err) => {
        setLoading(false);
        setHasError(true);
        setError(err.response.data.message);
      });
  }, []);

  const fileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", category);
    formData.append("photo", selectedFile);

    axios
      .put("http://localhost:3000/category/" + params.id, formData)
      .then((res) => {
        console.log(res);
        setLoading(false);
        navigate("/category");
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setHasError(true);
        setError(err.message);
      });
  };
  return (
    <>
      {isLoading && (
        <div>
          <img style={{ width: "150px" }} src={loader} />
        </div>
      )}

      {!isLoading && (
        <div>
          <h1>Add New Category</h1>
          <form onSubmit={submitHandler}>
            <input
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              type="text"
            />
            <input
              onChange={(e) => {
                fileHandler(e);
              }}
              type="file"
            />
            <button type="submit">Submit</button>
            <br />
            <img style={{ width: "120px" }} src={imageUrl} />
          </form>
        </div>
      )}
      {hasError && (
        <div>
          <p style={{ color: "red" }}>Error:- {error}</p>
        </div>
      )}
    </>
  );
};

export default Update;
