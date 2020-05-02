import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };
  console.log("colorEdit", colorToEdit);
  console.log("colorList", colors);
  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        console.log("editingColor", res.data);
        updateColors([
          ...colors.filter((item) => {
            return item.id !== colorToEdit.id;
          }),
          res.data,
        ]);
        setEditing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then((res) => {
        // console.log("deletingColor", res);
        updateColors(colors.filter((item) => item.id !== color.id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // -----------------------addingCOlor

  const submitForm = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post(`/api/colors`, colorToAdd)
      .then((res) => {
        // console.log("AddingColor", res);
        updateColors([...colors, colorToAdd]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={submitForm}>
        <label>
          ColorName
          <input
            name="color"
            value={colorToAdd.color}
            onChange={(e) => {
              setColorToAdd({ ...colorToAdd, color: e.target.value });
            }}
          />
        </label>
        <label>
          ColorCOde
          <input
            name="code.hex"
            value={colorToAdd.code.hex}
            onChange={(e) => {
              setColorToAdd({ ...colorToAdd, code: { hex: e.target.value } });
            }}
          />
        </label>
        <button type="submit">AddColor</button>
      </form>
    </div>
  );
};

export default ColorList;
