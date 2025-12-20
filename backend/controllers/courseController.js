import Course from "../models/courseModel.js";
import { getAuth } from "@clerk/express";
import fs from "fs";
import path from "path";

/* ---------- helpers ---------- */
const toNumber = (v, fallback = 0) => {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v.trim() === "") return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const parseJSONSafe = (maybe) => {
  if (!maybe) return null;
  if (typeof maybe === "object") return maybe;
  try {
    return JSON.parse(maybe);
  } catch {
    return null;
  }
};

const computeDerivedFields = (courseObj) => {
  let totalCourseMinutes = 0;
  if (!Array.isArray(courseObj.lectures)) courseObj.lectures = [];

  courseObj.lectures = courseObj.lectures.map((lec) => {
    lec = { ...lec };
    lec.duration = lec.duration || {};
    lec.chapters = Array.isArray(lec.chapters) ? lec.chapters : [];

    lec.chapters = lec.chapters.map((ch) => {
      ch = { ...ch };
      ch.duration = ch.duration || {};
      const h = toNumber(ch.duration.hours);
      const m = toNumber(ch.duration.minutes);
      ch.totalMinutes = h * 60 + m;
      ch.duration.hours = h;
      ch.duration.minutes = m;
      ch.videoUrl = ch.videoUrl || "";
      ch.name = ch.name || "";
      ch.topic = ch.topic || "";
      return ch;
    });

    const lh = toNumber(lec.duration.hours);
    const lm = toNumber(lec.duration.minutes);
    const lectureMinutes = lh * 60 + lm;
    const chapterMinutes = lec.chapters.reduce(
      (s, c) => s + toNumber(c.totalMinutes),
      0
    );

    lec.totalMinutes = lectureMinutes + chapterMinutes;
    totalCourseMinutes += lec.totalMinutes;

    lec.duration.hours = lh;
    lec.duration.minutes = lm;
    lec.title = lec.title || "Untitled lecture";

    return lec;
  });

  courseObj.totalDuration = {
    hours: Math.floor(totalCourseMinutes / 60),
    minutes: totalCourseMinutes % 60,
  };
  courseObj.totalLectures = courseObj.lectures.length;

  return courseObj;
};

const makeImageAbsolute = (rawImage, req) => {
  if (!rawImage) return "";
  if (rawImage.startsWith("http")) return rawImage;
  return `${req.protocol}://${req.get("host")}${
    rawImage.startsWith("/") ? rawImage : "/uploads/" + rawImage
  }`;
};

/* ---------- controllers ---------- */

// PUBLIC COURSES
export const getPublicCourses = async (req, res) => {
  try {
    const { home, type = "all", limit } = req.query;
    let filter = {};

    if (home === "true") filter.courseType = "top";
    else if (type === "top") filter.courseType = "top";
    else if (type === "regular") filter.courseType = "regular";

    const q = Course.find(filter).sort({ createdAt: -1 });
    if (limit) q.limit(Number(limit));

    const courses = await q.lean();
    const mapped = courses.map((c) => ({
      ...c,
      image: makeImageAbsolute(c.image, req),
    }));

    res.json({ success: true, items: mapped });
  } catch (error) {
    console.error("getPublicCourses error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// ALL COURSES (ADMIN)
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 }).lean();
    const mapped = courses.map((c) => ({
      ...c,
      image: makeImageAbsolute(c.image, req),
    }));
    res.json({ success: true, items: mapped });
  } catch (err) {
    console.error("getCourses error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// COURSE BY ID
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).lean();

    if (!course)
      return res
        .status(404)
        .json({ success: false, error: "Not found" });

    course.image = makeImageAbsolute(course.image, req);
    res.json({ success: true, course });
  } catch (err) {
    console.error("getCourseById error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// CREATE COURSE
export const createCourse = async (req, res) => {
  try {
    const body = req.body || {};
    const imagePath = req.file
      ? `/uploads/${req.file.filename}`
      : body.image || "";

    let lectures = parseJSONSafe(body.lectures) || [];
    const courseObj = {
      name: body.name || "",
      teacher: body.teacher || "",
      image: imagePath,
      overview: body.overview || "",
      lectures,
      courseType: body.courseType || "regular",
      pricingType: body.pricingType || "free",
    };

    computeDerivedFields(courseObj);

    const course = new Course(courseObj);
    await course.save();

    course.image = makeImageAbsolute(course.image, req);
    res.status(201).json({ success: true, course });
  } catch (err) {
    console.error("createCourse error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// DELETE COURSE
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course)
      return res.status(404).json({ success: false, error: "Not found" });

    if (course.image && !course.image.startsWith("http")) {
      const filePath = path.join(process.cwd(), course.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await course.deleteOne();
    res.json({ success: true, message: "Course deleted" });
  } catch (err) {
    console.error("deleteCourse error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// RATE COURSE
export const rateCourse = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    if (!userId)
      return res
        .status(401)
        .json({ success: false, message: "Login required" });

    const { courseId } = req.params;
    const { rating } = req.body;

    const course = await Course.findById(courseId);
    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    course.ratings.push({ userId, rating });
    await course.save();

    res.json({ success: true });
  } catch (err) {
    console.error("rateCourse error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//get myrating
export const getMyRating=async(req,res)=>{
  try{
    const {userId}=getAuth(req)||{};
    if(!userId) return res.status(401).json({
      success:false,
      message:'authentication required'
    });
    const {courseId}=req.params;
    const course =await Course.findById(courseId).lean();
    if(!course) return res.status(404).json({
      success:false,
      message:'course not found '
    });
    const my =(course.ratings || []).find(r=>String(r.userId)===String(userId))||null;
    return res.json({
      success:true,
      myRating:my ?{rating:my.rating, comment:my.comment}:null
    });
  }
  catch (err) {
    console.error("getMyRating error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

