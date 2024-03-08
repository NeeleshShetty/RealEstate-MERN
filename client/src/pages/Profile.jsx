import { useSelector } from "react-redux"
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess,signout } from '../redux/user/userSlice'
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const [image, setImage] = useState(undefined)
  const [imagePercent,setImagePercent] = useState(0)
  const [imageError, setImageError] = useState(null)
	const [formData, setFormData] = useState({})
	const [updateSuccess, setUpdateSuccess] = useState(null)
	const [showListingError, setShowListingError] = useState(false)
	const [userListings,setUserListings] = useState({})
	const fileRef = useRef(null)
	const dispatch = useDispatch()
  const { currentUser,loading,error } = useSelector(state => state.user)
    // console.log(formData);

  useEffect(() => {
    if (image) {
     handleFileUpload(image)
   }
  }, [image])

  const handleFileUpload = async (image) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name
    // console.log(image.name);
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setImagePercent(progress)
        // console.log('Upload is' + progress + '% done');
      },
      (error) => {
        setImageError(true)
      },
      () => (
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, profilePicture: downloadUrl })
        })
      ));
  }
  
	
	const handleChange = (e) => {
		setFormData({...formData , [e.target.id] : e.target.value})
	}

// console.log(formData);


	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			dispatch(updateUserStart())
			const res = await fetch(`/api/user/update/${currentUser._id}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			const data = await res.json()
			if (data.success === false) {
				dispatch(updateUserFailure(data.message))
				setUpdateSuccess(false)
			}
			dispatch(updateUserSuccess(data))
			setUpdateSuccess(true)
			// console.log(data);
		} catch (error) {
			dispatch(updateUserFailure(error))
				setUpdateSuccess(false);

		}
	}
	
	const handleDeleteAccount = async () => {
		try {
			deleteUserStart
			const res = await fetch(`/api/user/delete/${currentUser._id}`, {
				method:"DELETE"
			})
			const data = await res.json()
			if (data.success === false) {
				dispatch(deleteUserFailure(data))
			}

			dispatch(deleteUserSuccess())
		} catch (error) {
			dispatch(deleteUserFailure(error))
		}
	}

	const handleSignout = async () => {
		try {
			await fetch('api/auth/signout')
			dispatch(signout())
		} catch (error) {
			console.log(error);
		}
	}

	const handleShowListings = async () => {
		try {
			setShowListingError(false)
			const res = await fetch(`/api/user/listings/${currentUser._id}`);
			const data = await res.json()

			if (data.success === false) {
				setShowListingError(true)
				return
			}
			setUserListings(data)
			// console.log(data);
		} catch (error) {
			setShowListingError(true)
		}
	}

	 const handleListingDelete = async (listingId) => {
			try {
				const res = await fetch(`/api/listing/delete/${listingId}`, {
					method: 'DELETE',
				});
				const data = await res.json();
				if (data.success === false) {
					console.log(data.message);
					return;
				}

				setUserListings((prev) =>
					prev.filter((listing) => listing._id !== listingId)
				);
			} catch (error) {
				console.log(error.message);
			}
		};
  return (
		<div className="w-110 flex flex-col items-center ">
			<h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-y-4 "
			>
				<input
					type="file"
					ref={fileRef}
					hidden
					accept="image/*"
					onChange={(e) => setImage(e.target.files[0])}
				/>
				<img
					onClick={() => fileRef.current.click()}
					src={formData.profilePicture || currentUser.profilePicture}
					alt="profilepic"
					className="h-24 w-24 rounded-full self-center cursor-pointer object-cover m4-2"
				/>

				<p className="text-sm self-center">
					{imageError ? (
						<span className="text-red-700">
							Error uploading image (file size must be less than 2 MB)
						</span>
					) : imagePercent > 0 && imagePercent < 100 ? (
						<span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
					) : imagePercent === 100 ? (
						<span className="text-green-500">Image uploaded successfully</span>
					) : (
						''
					)}
				</p>

				<input
					defaultValue={currentUser.username}
					type="text"
					id="username"
					placeholder="Username"
					className="bg-slate-100 rounded-lg p-3 text-xl"
					onChange={handleChange}
				/>
				<input
					defaultValue={currentUser.email}
					type="email"
					id="email"
					placeholder="Email"
					className="bg-slate-100 rounded-lg p-3"
					onChange={handleChange}
				/>
				<input
					type="password"
					id="password"
					placeholder="Password"
					className="bg-slate-100 rounded-lg p-3"
					onChange={handleChange}
				/>

				<button
					disabled={loading}
					className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
				>
					{loading ? 'Loading...' : 'Update'}
				</button>
				<Link
					className="bg-green-700 text-white p-3 rounded-lg text-center font-semibold uppercase "
					to={'/create-listing'}
				>
					Create Listing
				</Link>
				<p className="text-green-500 self-center">
					{updateSuccess && 'Updated Successfully'}
				</p>
			</form>

			<div className="flex justify-between mt-5 gap-7">
				<span
					className="text-red-700 cursor-pointer "
					onClick={handleDeleteAccount}
				>
					Delete Account
				</span>
				<span
					className="text-red-700 cursor-pointer"
					onClick={handleSignout}
				>
					Sign Out
				</span>
			</div>
			<button
				onClick={handleShowListings}
				className="text-green-700 mt-2"
			>
				Show Listings
			</button>
			<p> {showListingError ? 'Error in Showing Lists' : ''}</p>
			{userListings && userListings.length > 0 && (
				<h1 className="text-3xl text-slate-600 font-semibold mt-7 mb-7">
					Your Listings
				</h1>
			)}

			{userListings &&
				userListings.length > 0 &&
				userListings.map((listing) => (
					<div
						key={listing._id}
						className="border rounded-lg p-3 flex justify-between items-center gap-10  mb-2 mt-2 w-96"
					>
						<Link to={`/listing/${listing._id}`}>
							<img
								className="h-16 w-16 object-contain "
								src={listing.imageUrls[0]}
								alt="listing cover"
							/>{' '}
						</Link>
						<Link
							className="font-semibold text-slate-700 flex-1 hover:underline truncate"
							to={`/listing/${listing._id}`}
						>
							<p>{listing.name}</p>
						</Link>

						<div className="flex flex-col gap-1 ">
							<button
								onClick={() => handleListingDelete(listing._id)}
								className="text-red-700 uppercase hover:scale-110 duration-300"
							>
								Delete
							</button>
							<Link to={`/update-listing/${listing._id}`}>
								<button className="text-green-700 uppercase hover:scale-110 duration-300">
									Edit
								</button>
							</Link>
						</div>
					</div>
				))}
		</div>
	);
}

export default Profile