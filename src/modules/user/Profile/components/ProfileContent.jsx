import { useProfileFormik } from "../formik/updateProfileFormik";

export const ProfileContent = () => {
  const formik = useProfileFormik();

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        {formik.errors.name && <p className="text-red-500">{formik.errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        {formik.errors.email && <p className="text-red-500">{formik.errors.email}</p>}
      </div>

      {/* <div>
        <label className="block text-sm font-medium">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        {formik.errors.phone && <p className="text-red-500">{formik.errors.phone}</p>}
      </div> */}

      {/* <div>
        <label className="block text-sm font-medium">Profile Image</label>
        <input
          type="text"
          name="image_url"
          value={formik.values.image_url}
          onChange={formik.handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div> */}

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="px-6 py-2 bg-green-600 text-white rounded-md"
      >
        {formik.isSubmitting ? "Updating..." : "Save Changes"}
      </button>
    </form>
  );
};
