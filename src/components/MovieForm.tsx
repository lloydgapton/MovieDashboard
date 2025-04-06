// components/MovieForm.tsx
import React, { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import {Input} from "./ui/Input";
import { Movie, MovieFormData, FormErrors } from "../types";
import { JSX } from "react";

interface MovieFormProps {
  onSubmit: (movie: Movie) => void;
  initialData?: Movie | null;
  isEditing: boolean;
  onCancelEdit: () => void;
}

export default function MovieForm({ 
  onSubmit, 
  initialData, 
  isEditing, 
  onCancelEdit 
}: MovieFormProps): JSX.Element {
  const [form, setForm] = useState<MovieFormData>({ 
    title: "", 
    year: "", 
    genre: "", 
    rating: "" 
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Reset form when initialData changes (edit mode)
  useEffect(() => {
    if (initialData) {
      setForm({
        id: initialData.id,
        title: initialData.title,
        year: initialData.year,
        genre: initialData.genre,
        rating: initialData.rating
      });
    } else {
      setForm({ title: "", year: "", genre: "", rating: "" });
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    
    if (!form.year) newErrors.year = "Year is required";
    else {
      const yearValue = Number(form.year);
      if (isNaN(yearValue) || yearValue < 1900 || yearValue > new Date().getFullYear()) {
        newErrors.year = "Enter a valid year";
      }
    }
    
    if (!form.genre.trim()) newErrors.genre = "Genre is required";
    
    if (!form.rating) newErrors.rating = "Rating is required";
    else {
      const ratingValue = Number(form.rating);
      if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 10) {
        newErrors.rating = "Rating must be between 0-10";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!validateForm()) return;
    
    // Convert string values to numbers where appropriate
    const submittedMovie: Movie = {
      id: form.id || Date.now(),
      title: form.title,
      year: Number(form.year),
      genre: form.genre,
      rating: Number(form.rating)
    };
    
    onSubmit(submittedMovie);
    if (!isEditing) {
      setForm({ title: "", year: "", genre: "", rating: "" });
    }
  };

  const handleChange = (field: keyof MovieFormData, value: string): void => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is edited
    if (field in errors && errors[field as Exclude<keyof MovieFormData, "id">]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
        <div>
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            error={errors.title}
          />
        </div>
        <div>
          <Input
            placeholder="Year"
            value={form.year}
            onChange={(e) => handleChange("year", e.target.value)}
            error={errors.year}
          />
        </div>
        <div>
          <Input
            placeholder="Genre"
            value={form.genre}
            onChange={(e) => handleChange("genre", e.target.value)}
            error={errors.genre}
          />
        </div>
        <div>
          <Input
            placeholder="Rating (0-10)"
            value={form.rating}
            onChange={(e) => handleChange("rating", e.target.value)}
            error={errors.rating}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button type="submit" primary>
          {isEditing ? "Update Movie" : "Add Movie"}
        </Button>
        {isEditing && (
          <Button type="button" onClick={onCancelEdit}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}