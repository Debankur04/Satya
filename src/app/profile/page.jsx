"use client";
import "./style.css";
import { useState, useRef, useEffect } from "react";
import { UserCircle, Award, History, Edit2, Save, X } from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const fileInputRef = useRef(null);
  const userId = "user-id-here"; // Replace this with the logged-in user's ID

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`/api/user-profile?userId=${userId}`);
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        setEditedUser({ ...data.user });
      } else {
        console.error("Error fetching user data:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditedUser((prev) => ({ ...prev, profilePicture: imageUrl }));
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/user-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          name: editedUser.name,
          email: editedUser.email,
          profilePicture: editedUser.profilePicture,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(editedUser);
        setIsEditing(false);
      } else {
        console.error("Error updating profile:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  if (!user) {
    return <div className="h-screen w-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#b3b3b3]">
      <div className="profile-container">
        <div className="user-header">
          <div className="image-container">
            <img
              src={isEditing ? editedUser.profilePicture : user.profilePicture}
              alt="Profile"
              className="profile-image"
              onClick={isEditing ? handleImageClick : undefined}
              style={isEditing ? { cursor: "pointer" } : {}}
            />
            {isEditing && (
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" style={{ display: "none" }} />
            )}
          </div>
          <div className="user-info">
            {isEditing ? (
              <>
                <input type="text" value={editedUser.name} onChange={(e) => setEditedUser((prev) => ({ ...prev, name: e.target.value }))} className="edit-input" />
                <input type="email" value={editedUser.email} onChange={(e) => setEditedUser((prev) => ({ ...prev, email: e.target.value }))} className="edit-input" />
              </>
            ) : (
              <>
                <h1>{user.name}</h1>
                <p className="email">{user.email}</p>
              </>
            )}
          </div>
          <div className="edit-buttons">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="icon-button save">
                  <Save size={20} />
                </button>
                <button onClick={handleCancel} className="icon-button cancel">
                  <X size={20} />
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="icon-button edit">
                <Edit2 size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Misinformation Reports Section */}
        <div className="cards-container">
          <div className="card">
            <div className="card-header">
              <History size={24} />
              <h2>Misinformation Reports & History</h2>
            </div>
            <div className="reports-list">
              {user.reports.map((report) => (
                <div key={report.id} className="report-item">
                  {report.type === "image" ? <img src={report.content} alt="Report" className="report-image" /> : <a href={report.content} className="report-link">{report.content}</a>}
                  <span className={`verdict ${report.verdict}`}>{report.verdict}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="card">
            <div className="card-header">
              <Award size={24} />
              <h2>Achievements</h2>
            </div>
            <div className="achievements-content">
              <div className="achievement-item">
                <h3>Quiz Score</h3>
                <p>{user.quizScores?.[0]?.score || 0}</p>
              </div>
              <div className="achievement-item">
                <h3>Quizzes Taken</h3>
                <p>{user.quizScores.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
