import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { register } from "../../redux/actions/AuthActions";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confPassword, setConfPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passworderror, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateNomor = (e) => {
    const inputValue = e.target.value;

    // membatasi input berupa angka dan simbol +
    const numberValue = inputValue.replace(/[^\d]/g, "");

    // membatasi inputan nomor menjadi 15
    const maxLength = 14;
    const truncateValueNomor = numberValue.slice(0, maxLength);

    setPhone(truncateValueNomor);
  };

  // Validasi password dengan konfirm password
  const passwordValidation = (password, confirm) => {
    if (!password || !confirm) {
      // Jika salah satu input kosong, tidak melakukan validasi
      setPasswordError("");
    } else if (password !== confirm) {
      setPasswordError(<MdCancel />);
    } else {
      setPasswordError(<FaCheckCircle />);
    }
  };

  const handlePasswordMatch = (event) => {
    setPassword(event.target.value);
    passwordValidation(event.target.value, confPassword);
  };

  const handleConfirmPasswordMatch = (event) => {
    setConfPassword(event.target.value);
    passwordValidation(password, event.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegis = (e) => {
    e.preventDefault();

    dispatch(
      register(
        name,
        email,
        phone,
        password,
        confPassword,
        setIsLoading,
        navigate
      )
    );
  };

  return (
    <>
      <div className="flex h-full bg-WHITE05 justify-center py-14">
        <div className="w-[100%] lg:w-[60%] flex justify-start items-center mx-[23px] lg:px-[128px] relative">
          <form
            onSubmit={handleRegis}
            className="w-full border-2 rounded-lg shadow-xl px-6 py-8"
          >
            <h1 className="text-[28px] font-Montserrat font-bold   mb-8">
              Daftar
            </h1>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className="font-Poppins text-[14px] mb-[4px]">
                  Nama
                </label>
                <input
                  type="text"
                  className="border w-full py-2 px-3 rounded-xl"
                  placeholder="Nama Lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-Poppins text-[14px] mb-[4px]">
                  Email
                </label>
                <input
                  type="email"
                  className="border w-full py-2 px-3 rounded-xl"
                  placeholder="Contoh: johndoe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-Poppins text-[14px] mb-[4px]">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  pattern="[0-9+]+"
                  className="border w-full py-2 px-3 rounded-xl appearance-none"
                  placeholder="+62, contohnya 6281...."
                  value={phone}
                  onChange={validateNomor}
                  style={{ appearance: "none" }}
                />
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <label className="font-Poppins text-[14px] mb-[4px]">
                    Buat Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="border w-full py-2 px-3 rounded-xl pr-[3.5rem]"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={handlePasswordMatch}
                  />
                  {passworderror && (
                    <p
                      className={`absolute top-1/2 right-4 transform -translate-y-1/2 px-8 py-1 ${
                        password === confPassword
                          ? "text-ALERTGREEN"
                          : "text-ALERTRED"
                      }`}
                    >
                      {passworderror}
                    </p>
                  )}
                  <button
                    type="button"
                    aria-label="toggle password visibility"
                    onClick={togglePassword}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1"
                  >
                    {showPassword ? (
                      <FiEyeOff className="border-none" />
                    ) : (
                      <FiEye className="border-none" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <label className="font-Poppins text-[14px] mb-[4px]">
                    Konfirmasi Password
                  </label>
                  <div></div>
                </div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="border w-full py-2 px-3 rounded-xl pr-[3.5rem]"
                    placeholder="Masukkan konfirmasi password"
                    value={confPassword}
                    onChange={handleConfirmPasswordMatch}
                  />
                  {passworderror && (
                    <p
                      className={`absolute top-1/2 right-4 transform -translate-y-1/2 px-8 py-1 ${
                        password === confPassword
                          ? "text-ALERTGREEN"
                          : "text-ALERTRED"
                      }`}
                    >
                      {passworderror}
                    </p>
                  )}
                  <button
                    type="button"
                    aria-label="toggle password visibility"
                    onClick={toggleConfirmPassword}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="font-Poppins btn btn-primary w-full text-[14px] font-medium bg-YELLOW05 text-white py-[10px] rounded-xl mt-10 "
            >
              {isLoading ? "Loading..." : "Daftar"}
            </button>
            <div className="flex justify-center items-center gap-2 mt-6">
              <h1 className="font-Poppins text-[14px] font-normal">
                Sudah punya akun?
              </h1>
              <Link
                to="/login"
                className="font-Poppins text-DARKBLUE05 text-[14px] font-bold hover:underline hover:border-DARKBLUE05"
              >
                Masuk di sini
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;