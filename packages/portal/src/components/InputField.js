import React from "react";
import { OutlinedInput } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { FormLabel } from "@mui/material";

const InputField = (props) => {
  const { register } = useForm();
  const customWidth = props.width;
  return (
    <>
      <FormLabel
        htmlFor="form-label-above"
        sx={{ fontFamily: "Poppins", display: "block" }}
      >
        {props.labelAbove}
      </FormLabel>

      <Controller
        name={props.name}
        control={props.control}
        {...register(props.name)}
        render={({ field }) => (
          <OutlinedInput
            {...field}
            sx={{
              borderRadius: "20px",
              fontFamily: "Poppins",
              width: customWidth || "100%",
              display: "block",
            }}
            placeholder={props.placeholder}
          />
        )}
      />
      <FormLabel
        htmlFor="form-label-below"
        sx={{ fontFamily: "Poppins", fontSize: "14px" }}
      >
        {props.labelBelow}
      </FormLabel>
    </>
  );
};

export default InputField;
