import { myProfile, updateProfile } from "actions/profileAction";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import Textarea from "components/Textarea/Textarea";
import React from "react";
import { toast, ToastContainer } from "react-toastify";

const DashboardEditProfile = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [facebook, setFacebook] = React.useState("");
  const [twitter, setTwitter] = React.useState("");
  const [instagram, setInstagram] = React.useState("");
  const [youtube, setYoutube] = React.useState("");
  const [data, setData] = React.useState({});
  const [loader, setLoader] = React.useState(false);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoader(true);
    let loadProfileRes: any = await myProfile();
    setData(loadProfileRes);

    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    let updateProfileRes = await updateProfile(
      firstName,
      lastName,
      bio,
      facebook,
      twitter,
      instagram,
      youtube
    );
    console.log("res update profile", updateProfileRes);
    loadData();
    toast.success("Your Profile Updated Successfully!", {
      autoClose: 10000,
    });
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  return (
    <>
      {!loader ? (
        <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
          <form className="grid md:grid-cols-2 gap-6" action="#" method="post">
            <label className="block">
              <Label>First name</Label>
              <Input
                placeholder="John"
                defaultValue={data?.first_name}
                type="text"
                className="mt-1"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="block">
              <Label>Last name</Label>
              <Input
                placeholder="Doe"
                defaultValue={data?.last_name}
                type="text"
                className="mt-1"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

            <label className="block">
              <Label>Facebook</Label>
              <Input
                placeholder="Facebook Profile Link"
                defaultValue={data?.facebook_link}
                type="text"
                className="mt-1"
                onChange={(e) => setFacebook(e.target.value)}
              />
            </label>
            <label className="block">
              <Label>Twitter</Label>
              <Input
                placeholder="Twitter Profile Link"
                defaultValue={data?.twitter}
                type="text"
                className="mt-1"
                onChange={(e) => setTwitter(e.target.value)}
              />
            </label>
            <label className="block">
              <Label>Instagram</Label>
              <Input
                placeholder="Instagram Profile Link"
                defaultValue={data?.instagram_link}
                type="text"
                className="mt-1"
                onChange={(e) => setInstagram(e.target.value)}
              />
            </label>
            <label className="block">
              <Label>Youtube</Label>
              <Input
                defaultValue={data?.youtube}
                placeholder="Youtube Channel Link"
                type="text"
                className="mt-1"
                onChange={(e) => setYoutube(e.target.value)}
              />
            </label>
          </form>
          <label className="block  description-container mt-5 ">
            <Label>Bio</Label>
            <Textarea
              defaultValue={data?.bio}
              placeholder="Bio"
              className=" text-area"
              onChange={(e) => setBio(e.target.value)}
            />
          </label>
          <div className=" flex mt-8 mb-4 justify-start">
            <ButtonPrimary
              className="col-span-4 create-event-button"
              type="submit"
              onClick={() => onSubmit(event)}
            >
              Update
            </ButtonPrimary>
            <ToastContainer />
          </div>
        </div>
      ) : (
        <div className="sm:w-full items-center lg:w-10/12 animate-pulse lg:h-96 p-4 lg:mx-4 border-2 rounded-xl  mt-2 ">
          <div className=" lg:flex flex-row items-center my-4 justify-between lg:px-8 ">
            <div>
              <div className="w-20 bg-gray-300 h-5 my-2 rounded-md "></div>
              <div className="w-56  bg-gray-300 h-12 rounded-md "></div>
            </div>
            <div>
              <div className="w-20 bg-gray-300 h-5 my-2 rounded-md "></div>
              <div className="w-56  bg-gray-300 h-12 rounded-md "></div>
            </div>
          </div>
          <div className="lg:flex flex-row items-center my-4 justify-between lg:px-8">
            <div>
              <div className="w-20 bg-gray-300 h-5 my-2 rounded-md "></div>
              <div className="w-56  bg-gray-300 h-12 rounded-md "></div>
            </div>
            <div>
              <div className="w-20 bg-gray-300 h-5 my-2 rounded-md "></div>
              <div className="w-56  bg-gray-300 h-12 rounded-md "></div>
            </div>
          </div>
          <div className="lg:flex flex-row items-center my-4 justify-between lg:px-8">
            <div>
              <div className="w-20 bg-gray-300 h-5 my-2 rounded-md "></div>
              <div className="w-56  bg-gray-300 h-12 rounded-md "></div>
            </div>
            <div>
              <div className="w-20 bg-gray-300 h-5 my-2 rounded-md "></div>
              <div className="w-56  bg-gray-300 h-12 rounded-md "></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardEditProfile;
