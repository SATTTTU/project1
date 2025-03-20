import React, { useState } from 'react';
import { PlusCircle, Trash2, Award, Clock, Briefcase } from 'lucide-react';
import { useProfileForm } from '../formik/usecookprofile';

const AchievementsExperience = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newQualification, setNewQualification] = useState({
    title: '',
    institution: '',
    year: new Date().getFullYear()
  });

  const { formik, isSubmitting } = useProfileForm({
    skills: userData.skills || [],
    yearsOfExperience: userData.yearsOfExperience || 0,
    qualifications: userData.qualifications || []
  });

  const handleAddSkill = () => {
    if (newSkill.trim() && !formik.values.skills.includes(newSkill.trim())) {
      formik.setFieldValue('skills', [...formik.values.skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill) => {
    formik.setFieldValue(
      'skills',
      formik.values.skills.filter((s) => s !== skill)
    );
  };

  const handleAddQualification = () => {
    if (newQualification.title.trim() && newQualification.institution.trim()) {
      formik.setFieldValue('qualifications', [
        ...formik.values.qualifications,
        { ...newQualification }
      ]);
      setNewQualification({
        title: '',
        institution: '',
        year: new Date().getFullYear()
      });
    }
  };

  const handleRemoveQualification = (index) => {
    formik.setFieldValue(
      'qualifications',
      formik.values.qualifications.filter((_, i) => i !== index)
    );
  };

  const handleCancel = () => {
    setIsEditing(false);
    formik.resetForm();
    setNewSkill('');
    setNewQualification({
      title: '',
      institution: '',
      year: new Date().getFullYear()
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Achievements & Experience</h2>
        {!isEditing ? (
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        ) : (
          <div className="flex space-x-2">
            <button 
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={formik.handleSubmit}
              disabled={isSubmitting}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Years of Experience */}
        <div>
          <div className="flex items-center mb-2">
            <Clock className="h-4 w-4 text-blue-600 mr-2" />
            <h3 className="font-medium text-gray-800">Years of Experience</h3>
          </div>
          
          {isEditing ? (
            <div>
              <input
                type="number"
                name="yearsOfExperience"
                value={formik.values.yearsOfExperience}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                min="0"
                className="w-24 p-2 border rounded-md"
              />
              {formik.touched.yearsOfExperience && formik.errors.yearsOfExperience && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.yearsOfExperience}</p>
              )}
            </div>
          ) : (
            <p className="text-gray-700">
              {userData.yearsOfExperience} {userData.yearsOfExperience === 1 ? 'year' : 'years'}
            </p>
          )}
        </div>

        {/* Skills */}
        <div>
          <div className="flex items-center mb-2">
            <Award className="h-4 w-4 text-blue-600 mr-2" />
            <h3 className="font-medium text-gray-800">Skills</h3>
          </div>
          
          {isEditing ? (
            <div>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1 p-2 border rounded-l-md"
                  placeholder="Add a skill"
                />
                <button
                  onClick={handleAddSkill}
                  className="bg-blue-600 text-white px-3 py-2 rounded-r-md"
                >
                  Add
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {formik.values.skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-100 flex items-center px-3 py-1 rounded-full"
                  >
                    <span className="text-gray-800">{skill}</span>
                    <button 
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              
              {formik.touched.skills && formik.errors.skills && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.skills}</p>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {userData.skills && userData.skills.map((skill, index) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-gray-800">
                  {skill}
                </span>
              ))}
              {(!userData.skills || userData.skills.length === 0) && (
                <span className="text-gray-500">No skills specified</span>
              )}
            </div>
          )}
        </div>

        {/* Qualifications */}
        <div>
          <div className="flex items-center mb-2">
            <Briefcase className="h-4 w-4 text-blue-600 mr-2" />
            <h3 className="font-medium text-gray-800">Qualifications & Certifications</h3>
          </div>
          
          {isEditing ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                <input
                  type="text"
                  value={newQualification.title}
                  onChange={(e) => setNewQualification({...newQualification, title: e.target.value})}
                  className="p-2 border rounded-md"
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={newQualification.institution}
                  onChange={(e) => setNewQualification({...newQualification, institution: e.target.value})}
                  className="p-2 border rounded-md"
                  placeholder="Institution"
                />
                <div className="flex">
                  <input
                    type="number"
                    value={newQualification.year}
                    onChange={(e) => setNewQualification({...newQualification, year: e.target.value})}
                    className="flex-1 p-2 border rounded-l-md"
                    placeholder="Year"
                  />
                  <button
                    onClick={handleAddQualification}
                    className="bg-blue-600 text-white px-3 py-2 rounded-r-md"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              {formik.values.qualifications.length > 0 ? (
                <div className="mt-2 border rounded-md overflow-hidden">
                  {formik.values.qualifications.map((qual, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center p-3 border-b last:border-b-0"
                    >
                      <div>
                        <div className="font-medium">{qual.title}</div>
                        <div className="text-sm text-gray-600">
                          {qual.institution}, {qual.year}
                        </div>
                      </div>
                      <button 
                        onClick={() => handleRemoveQualification(index)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No qualifications added</p>
              )}
            </div>
          ) : (
            <div>
              {userData.qualifications && userData.qualifications.length > 0 ? (
                <div className="space-y-2">
                  {userData.qualifications.map((qual, index) => (
                    <div key={index} className="border-b pb-2 last:border-b-0 last:pb-0">
                      <div className="font-medium">{qual.title}</div>
                      <div className="text-sm text-gray-600">
                        {qual.institution}, {qual.year}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No qualifications specified</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementsExperience;