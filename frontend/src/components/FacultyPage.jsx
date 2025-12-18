import React from "react";
import { facultyStyles } from "../assets/dummyStyles";
import sampleTeachers from "../assets/dummyFaculty";
import { Instagram, Linkedin, Mail, Star } from "lucide-react";

const motion = {
  div: ({ children, className }) => (
    <div className={className}>{children}</div>
  ),
};

const FacultyPage = () => {
  return (
    <div className={facultyStyles.container}>
      <div className={facultyStyles.header}>
        <div className={facultyStyles.headerContent}>
          <h1 className={facultyStyles.title}>Meet Our Faculty</h1>
          <div className={facultyStyles.titleDivider}></div>
          <p className={facultyStyles.subtitle}>
            Learn from industry experts and academic pioneers dedicated to your success.
          </p>
        </div>
      </div>

      {/* Faculty cards */}
      <div className={facultyStyles.facultySection}>
        <div className={facultyStyles.facultyContainer}>
          <div className={facultyStyles.facultyGrid}>
            {sampleTeachers.map((teacher) => (
              <motion.div key={teacher.id} className={facultyStyles.card}>
                <div className={facultyStyles.teacherCard}>
                  
                  {/* Image */}
                  <div className={facultyStyles.imageContainer}>
                    <div className={facultyStyles.imageWrapper}>
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className={facultyStyles.image}
                      />
                    </div>

                    <div className={facultyStyles.experienceBadge}>
                      <div className={facultyStyles.experienceBadgeContent}>
                        {teacher.experience} Exp
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className={facultyStyles.teacherInfo}>
                    <h3 className={facultyStyles.teacherName}>{teacher.name}</h3>
                    <p className={facultyStyles.teacherQualification}>
                      {teacher.qualification}
                    </p>
                    <p className={facultyStyles.teacherBio}>{teacher.bio}</p>
                  </div>

                  {/* Rating */}
                  <div className={facultyStyles.ratingContainer}>
                    <div className={facultyStyles.starRating}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`${facultyStyles.starIcon} ${
                            i < Math.round(teacher.initialRating)
                              ? facultyStyles.starButtonActive
                              : facultyStyles.starButtonInactive
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className={facultyStyles.socialContainer}>
                    <a
                      href={`mailto:${teacher.email}`}
                      className={`${facultyStyles.socialIcon} ${facultyStyles.socialIconEmail}`}
                      title={`Email ${teacher.name}`}
                    >
                      <Mail className={facultyStyles.socialIconSvg} />
                    </a>

                    {teacher.linkedin && (
                      <a
                        href={teacher.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${facultyStyles.socialIcon} ${facultyStyles.socialIconLinkedin}`}
                      >
                        <Linkedin className={facultyStyles.socialIconSvg} />
                      </a>
                    )}

                    {teacher.instagram && (
                      <a
                        href={teacher.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${facultyStyles.socialIcon} ${facultyStyles.socialIconInstagram}`}
                      >
                        <Instagram className={facultyStyles.socialIconSvg} />
                      </a>
                    )}
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{facultyStyles.animations}</style>
    </div>
  );
};

export default FacultyPage;
