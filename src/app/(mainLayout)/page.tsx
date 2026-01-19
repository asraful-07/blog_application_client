import { userService } from "@/services/user.service";

const Homepage = async () => {
  const { data } = await userService.getSession();
  console.log(data);

  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
};

export default Homepage;
