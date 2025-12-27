import React, { useEffect, useState } from "react";
import {
  animationDelays,
  myCoursesCustomStyles,
  myCoursesStyles,
} from "../assets/dummyStyles";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Star } from "lucide-react";

const API_BASE = "http://localhost:4000/";

const MyCourses = () => {
  const navigate = useNavigate();

  // ❌ isSigendIn → ✅ isSignedIn
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();

  const [courses, setCourses] = useState([]);

  // ❌ useState([true]) → ✅ useState(true)
  const [loading, setLoading] = useState(true);

  // ❌ useState([null]) → ✅ useState(null)
  const [error, setError] = useState(null);

  const [userRatings, setUserRatings] = useState(() => {
    try {
      const raw = localStorage.getItem("userCourseRatings");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [hoverRatings, setHoverRatings] = useState({});

  useEffect(() => {
    try {
      localStorage.setItem(
        "userCourseRatings",
        JSON.stringify(userRatings)
      );
    } catch {}
  }, [userRatings]);

  // ================= FETCH =================

  // ❌ seEffect → ✅ useEffect
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchMyCourses = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!isSignedIn) {
          if (mounted) {
            setCourses([]);
            setLoading(false);
          }
          return;
        }

        const headers = { "Content-Type": "application/json" };

        try {
          const token = await getToken().catch(() => null);
          if (token) headers.Authorization = `Bearer ${token}`;
        } catch (e) {}

        const bookingsRes = await fetch(`${API_BASE}api/booking/my`, {
          method: "GET",
          credentials: "include",
          signal: controller.signal,
          headers,
        });

        if (bookingsRes.status === 401) {
          throw new Error(
            "Unauthorized — please sign in to view your bookings."
          );
        }

        if (!bookingsRes.ok) {
          const text = await bookingsRes.text().catch(() => "");
          throw new Error(
            text || `Failed to fetch bookings (${bookingsRes.status})`
          );
        }

        const bookingsJson = await bookingsRes.json();
        if (!bookingsJson || bookingsJson.success === false) {
          throw new Error(
            bookingsJson?.message || "Failed to load bookings"
          );
        }

        const bookings = bookingsJson.bookings || [];

        const combined = await Promise.all(
          bookings.map(async (b) => {
            const courseId = b.course ?? b.courseId ?? null;
            if (!courseId) return null;

            try {
              const cHeaders = { "Content-Type": "application/json" };
              const token = await getToken().catch(() => null);
              if (token) cHeaders.Authorization = `Bearer ${token}`;

              const courseRes = await fetch(
                `${API_BASE}api/course/${courseId}`,
                {
                  method: "GET",
                  credentials: "include",
                  signal: controller.signal,
                  headers: cHeaders,
                }
              );

              if (!courseRes.ok) return null;

              const courseJson = await courseRes.json();
              if (!courseJson?.course) return null;

              const courseData = courseJson.course;

              return {
                booking: b,
                course: {
                  ...courseData,
                  image: courseData.image || null,
                  avgRating:
                    courseData.avgRating ??
                    courseData.rating ??
                    0,
                  totalRatings:
                    courseData.totalRatings ??
                    courseData.ratingCount ??
                    0,
                },
              };
            } catch {
              return null;
            }
          })
        );

        if (!mounted) return;

        const valid = combined.filter(Boolean);

        const uiCourses = valid.map(({ booking, course }) => ({
          booking,
          id:
            course._id ??
            course.id ??
            booking.course ??
            booking.courseId,
          name:
            course.name ??
            booking.courseName ??
            "Untitled Course",
          teacher:
            course.teacher ??
            booking.teacherName ??
            "",
          image: course.image ?? null,
          avgRating: course.avgRating ?? 0,
          totalRatings: course.totalRatings ?? 0,
          price:
            course.price ?? {
              original: booking.price ?? 0,
              sale: booking.price ?? 0,
            },
        }));

        setCourses(uiCourses);
      } catch (err) {
        if (mounted)
          setError(err.message || "Failed to load your courses");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchMyCourses();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [isSignedIn, getToken]);

  // ================= RATING =================

  const submitRatingToServer = async (courseId, ratingValue) => {
    try {
      const headers = { "Content-Type": "application/json" };
      const token = await getToken().catch(() => null);
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(
        `${API_BASE}api/course/${courseId}/rate`,
        {
          method: "POST",
          headers,
          credentials: "include",
          body: JSON.stringify({ rating: ratingValue }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Rating failed");
      }

      setUserRatings((prev) => ({
        ...prev,
        [courseId]: ratingValue,
      }));

      toast.success("Thanks for rating!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSetRating = async (e, courseId, rating) => {
    // ❌ stopPropogation → ✅ stopPropagation
    e.stopPropagation();

    if (!isSignedIn) {
      toast("Please sign in to submit rating", {
        icon: "⭐",
      });
      return;
    }

    setUserRatings((prev) => ({
      ...prev,
      [courseId]: rating,
    }));

    await submitRatingToServer(courseId, rating);
  };

  const handleViewCourse = (courseId) => {
    if (!courseId) return;
    navigate(`/course/${courseId}`);
  };

  // ================= STARS =================

  const renderInteractiveStars = (c) => {
    const userRating = userRatings[c.id] || 0;
    const hover = hoverRatings[c.id] || 0;
    const displayRating =
      hover || userRating || Math.round(c.avgRating || 0);

    return (
      <div style={{ display: "flex", gap: 4 }}>
        {[1, 2, 3, 4, 5].map((idx) => (
          <button
            key={idx}
            onClick={(e) =>
              handleSetRating(e, c.id, idx)
            }
            onMouseEnter={() =>
              setHoverRatings((p) => ({
                ...p,
                [c.id]: idx,
              }))
            }
            onMouseLeave={() =>
              setHoverRatings((p) => ({
                ...p,
                [c.id]: 0,
              }))
            }
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Star
              size={16}
              fill={
                idx <= displayRating
                  ? "#f59e0b"
                  : "none"
              }
              stroke="#f59e0b"
            />
          </button>
        ))}
      </div>
    );
  };

  // ================= UI STATES =================

  if (loading) {
    return (
      <div className={myCoursesStyles.pageContainer}>
        <h1 className={myCoursesStyles.header}>
          Loading courses...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className={myCoursesStyles.pageContainer}>
        <h1
          className={myCoursesStyles.header}
          style={{ color: "red" }}
        >
          {error}
        </h1>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className={myCoursesStyles.pageContainer}>
        <h1 className={myCoursesStyles.header}>
          You haven't purchased any courses yet.
        </h1>
      </div>
    );
  }

  // ================= MAIN =================

  return (
    <div className={myCoursesStyles.pageContainer}>
      <div className={myCoursesStyles.mainContainer}>
        <h1 className={myCoursesStyles.header}>
          My Courses
        </h1>

        <div className={myCoursesStyles.grid}>
          {courses.map((course, index) => (
            <div
              key={course.id ?? index}
              className={myCoursesStyles.courseCard}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: `fadeInUp 0.6s ease-out ${
                  index * 100
                }ms both`,
              }}
              role="button"
              tabIndex={0}
              onClick={() =>
                handleViewCourse(course.id)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleViewCourse(course.id);
                }
              }}
            >
              <div
                className={myCoursesStyles.imageContainer}
              >
                <img
                  src={course.image || undefined}
                  alt={course.name}
                  className={
                    myCoursesStyles.courseImage
                  }
                />
              </div>

              {renderInteractiveStars(course)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
