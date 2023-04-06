import axios from "axios";
const create = async (Usersdata) => {
  const { data } = await axios.post("http://localhost:8080/api/v1/user/add", {
    ...Usersdata,
  });
  console.log("data in services--", data);
  return data;
};

const getAll = async () => {
  const { data } = await axios.get("http://localhost:8080/api/v1/user");
  console.log("data in get", data);
  return data;
};

const search = async (search) => {
  const { data } = await axios.get(
    `http://localhost:8080/api/v1/user/${search}`
  );
  return data;
};

const remove = async (userId) => {
  const { data } = await axios.delete(
    `http://localhost:8080/api/v1/delete/${userId}`
  );
  return data;
};

const update = async (user) => {
  const { data } = await axios.put(
    `http://localhost:8080/api/v1/edit/${user._id}`,
    {
      ...user,
    }
  );
  return data;
};

const UserServices = {
  create,
  getAll,
  remove,
  update,
  search,
};

export default UserServices;
