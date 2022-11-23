import React from "react";
import api from "@utils/Api";

const Details = ({ url }) => {
  const [data, setData] = React.useState({
    details: "",
    createdAt: "",
  });

  const getData = async () => {
    try {
      const { data: response } = await api({
        url,
        params: { type: "details" },
        requestType: "GET",
      });

      let { details, createdAt } = response.data;
      createdAt = new Date(createdAt).toLocaleDateString("es-BO", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setData({ details, createdAt });
    } catch (error) {
      const _response = error.response?.data;
      // alert(_response.data?.error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>
        <h4>Details</h4>
        <p>{data.details}</p>
      </div>
      <div>
        <h4>Created at</h4>
        <p>{data.createdAt}</p>
      </div>
    </div>
  );
};
export default Details;
