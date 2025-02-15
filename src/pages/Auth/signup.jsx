// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { signupUser, clearSuccessMessage } from "../../Redux/Slices/user_slice";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import debounce from "lodash.debounce";

// const Signup = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isLoading, error, isRegistered, otpSent } = useSelector(
//     (state) => state.user
//   );

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     role: "",
//     contact_phone: "",
//   });

//   const [availabilityErrors, setAvailabilityErrors] = useState({});
//   const [showPasswordHint, setShowPasswordHint] = useState(false);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//   useEffect(() => {
//     if (isRegistered && otpSent) {
//       setShowSuccessMessage(true);
//       setFormData({
//         username: "",
//         email: "",
//         password: "",
//         role: "",
//         contact_phone: "",
//       });

//       const timer = setTimeout(() => {
//         setShowSuccessMessage(false);
//         dispatch(clearSuccessMessage());
//         navigate("/EmailVerification");
//       }, 1400);

//       return () => clearTimeout(timer);
//     }
//   }, [isRegistered, otpSent, navigate, dispatch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));

//     if (name === "email" || name === "username") {
//       debouncedCheckAvailability(name, value);
//     }
//   };

//   const handlePasswordChange = (e) => {
//     const newPassword = e.target.value;
//     setFormData((prevData) => ({ ...prevData, password: newPassword }));
//     setShowPasswordHint(
//       newPassword.length < 6 || !/(?=.*[A-Za-z])(?=.*\d)/.test(newPassword)
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(signupUser(formData));
//   };

//   const checkAvailability = async (name, value) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/api/user-availability/`,
//         { params: { [name]: value } }
//       );
//       setAvailabilityErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: response.data[name] || null,
//       }));
//     } catch (error) {
//       console.error("Error checking availability:", error);
//     }
//   };

//   const debouncedCheckAvailability = debounce(checkAvailability, 500);

//   const isSignUpDisabled =
//     !!availabilityErrors.username ||
//     !!availabilityErrors.email ||
//     !formData.username ||
//     !formData.email;

//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
//       <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex flex-1 relative">
//         <div
//           className="hidden lg:flex flex-1 bg-cover bg-center bg-no-repeat h-full"
//           style={{
//             backgroundImage: "url('/images/adult.jpg')" ,
//           }}
//         />
//         <div className="w-full lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col justify-center">
//           <div className="flex flex-col items-center mb-8">
//             <h1 className="text-5xl font-bold text-green-600 flex items-center space-x-2">
//               <img
//                 src="/images/plant.png" 
//                 alt="Leaf Icon"
//                 className="w-12 h-12 text-green-500"
//               />
//               <span>AguuraMuhinzi</span>
//             </h1>
//             <p className="text-gray-600 mt-2 text-center">
//               Join the platform connecting knowledge and agriculture
//             </p>
//           </div>

//           {showSuccessMessage && (
//             <div className="mb-6 p-4 text-green-700 bg-green-100 border border-green-400 rounded">
//               We sent you a verification code on your email.
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center w-full flex-1">
//             <div className="my-12 border-b text-center">
//               <div className="leading-none px-5 inline-block text-sm text-gray-700 tracking-wide font-medium bg-white transform translate-y-1/2">
//                 Create your account
//               </div>
//             </div>

//             <div className="mx-auto max-w-xs">
//               <input
//                 name="username"
//                 required
//                 className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
//                 type="text"
//                 placeholder="Username"
//                 onChange={handleChange}
//                 value={formData.username}
//               />
//               {availabilityErrors.username && (
//                 <p className="text-red-500 text-xs mt-1">{availabilityErrors.username}</p>
//               )}

//               <input
//                 name="email"
//                 required
//                 className="w-full px-8 py-4 mt-5 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
//                 type="email"
//                 placeholder="Email"
//                 onChange={handleChange}
//                 value={formData.email}
//               />
//               {availabilityErrors.email && (
//                 <p className="text-red-500 text-xs mt-1">{availabilityErrors.email}</p>
//               )}

//               <div className="relative mt-5">
//                 <input
//                   name="password"
//                   required
//                   className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
//                   type="password"
//                   placeholder="Password"
//                   onChange={handlePasswordChange}
//                   value={formData.password}
//                 />
//                 {showPasswordHint && (
//                   <p className="text-red-500 text-xs mt-2">
//                     Password must be at least 6 characters and contain both letters and numbers.
//                   </p>
//                 )}
//               </div>

//               <input
//                 name="contact_phone"
//                 required
//                 className="w-full px-8 py-4 mt-5 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
//                 type="text"
//                 pattern="\d{10}"
//                 maxLength="10"
//                 placeholder="Contact Phone"
//                 onChange={handleChange}
//                 value={formData.contact_phone}
//               />

//               <div className="mt-6">
//                 <p className="text-sm font-medium text-gray-700 mb-2">
//                   Are you registering on behalf of an academy or a cooperative?
//                 </p>
//                 <div className="flex items-center space-x-4">
//                   <label className="inline-flex items-center">
//                     <input
//                       type="radio"
//                       name="role"
//                       value="academy"
//                       required
//                       className="form-radio text-green-500"
//                       checked={formData.role === "academy"}
//                       onChange={handleChange}
//                     />
//                     <span className="ml-2 text-gray-700">Academy</span>
//                   </label>
//                   <label className="inline-flex items-center">
//                     <input
//                       type="radio"
//                       name="role"
//                       value="cooperative"
//                       required
//                       className="form-radio text-green-500"
//                       checked={formData.role === "cooperative"}
//                       onChange={handleChange}
//                     />
//                     <span className="ml-2 text-gray-700">Cooperative</span>
//                   </label>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isLoading || isSignUpDisabled}
//                 className={`mt-8 tracking-wide font-semibold ${
//                   isSignUpDisabled ? "bg-green-400" : "bg-green-500"
//                 } text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300`}
//               >
//                 {isLoading ? "Signing Up..." : "Sign Up"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, clearSuccessMessage } from "../../Redux/Slices/user_slice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isRegistered, otpSent } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    contact_phone: "",
  });

  const [availabilityErrors, setAvailabilityErrors] = useState({});
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (isRegistered && otpSent) {
      setShowSuccessMessage(true);
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "",
        contact_phone: "",
      });

      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
        dispatch(clearSuccessMessage());
        navigate("/EmailVerification");
      }, 1400);

      return () => clearTimeout(timer);
    }
  }, [isRegistered, otpSent, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "email" || name === "username") {
      debouncedCheckAvailability(name, value);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData((prevData) => ({ ...prevData, password: newPassword }));
    setShowPasswordHint(
      newPassword.length < 6 || !/(?=.*[A-Za-z])(?=.*\d)/.test(newPassword)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(formData));
  };

  const checkAvailability = async (name, value) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user-availability/`,
        { params: { [name]: value } }
      );
      setAvailabilityErrors((prevErrors) => ({
        ...prevErrors,
        [name]: response.data[name] || null,
      }));
    } catch (error) {
      console.error("Error checking availability:", error);
    }
  };

  const debouncedCheckAvailability = debounce(checkAvailability, 500);

  const isSignUpDisabled =
    !!availabilityErrors.username ||
    !!availabilityErrors.email ||
    !formData.username ||
    !formData.email;

  return (
    <div className="bg-gray-100 text-gray-900 flex justify-center items-center p-4">
      <div className="max-w-4xl w-full bg-white shadow sm:rounded-lg flex flex-col lg:flex-row overflow-hidden">
        {/* Image Section */}
        <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/adult.jpg')",
          }}
        />
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-6 sm:p-12">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-4xl font-bold text-green-600 flex items-center space-x-2">
              <img
                src="/images/plant.png"
                alt="Leaf Icon"
                className="w-10 h-10"
              />
              <span>AguuraMuhinzi</span>
            </h1>
            <p className="text-gray-600 mt-2 text-center">
              Join the platform connecting knowledge and agriculture
            </p>
          </div>

          {showSuccessMessage && (
            <div className="mb-6 p-4 text-green-700 bg-green-100 border border-green-400 rounded">
              We sent you a verification code on your email.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="mb-8 text-center">
              <h2 className="text-xl font-semibold">Create your account</h2>
            </div>

            <div className="w-full max-w-sm">
              <input
                name="username"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                value={formData.username}
              />
              {availabilityErrors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {availabilityErrors.username}
                </p>
              )}

              <input
                name="email"
                required
                className="w-full px-4 py-3 mt-4 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.email}
              />
              {availabilityErrors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {availabilityErrors.email}
                </p>
              )}

              <div className="relative mt-4">
                <input
                  name="password"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                  type="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                  value={formData.password}
                />
                {showPasswordHint && (
                  <p className="text-red-500 text-xs mt-2">
                    Password must be at least 6 characters and contain both letters and numbers.
                  </p>
                )}
              </div>

              <input
                name="contact_phone"
                required
                className="w-full px-4 py-3 mt-4 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                type="text"
                pattern="\d{10}"
                maxLength="10"
                placeholder="Contact Phone"
                onChange={handleChange}
                value={formData.contact_phone}
              />

              <div className="mt-6">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Are you registering on behalf of an academy or a cooperative?
                </p>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="academy"
                      required
                      className="form-radio text-green-500"
                      checked={formData.role === "academy"}
                      onChange={handleChange}
                    />
                    <span className="ml-2 text-gray-700">Academy</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="cooperative"
                      required
                      className="form-radio text-green-500"
                      checked={formData.role === "cooperative"}
                      onChange={handleChange}
                    />
                    <span className="ml-2 text-gray-700">Cooperative</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || isSignUpDisabled}
                className={`mt-8 w-full py-3 rounded-lg text-white font-semibold tracking-wide transition-all duration-300 ${
                  isSignUpDisabled ? "bg-green-400" : "bg-green-500 hover:bg-green-700"
                }`}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
