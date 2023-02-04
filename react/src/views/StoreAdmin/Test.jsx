import React, { useState } from "react";
import Select from "react-select";

export default function App() {
  var selected = "2";
  const options = [
    { value: "1", label: "Beycan" },
    { value: "2", label: "Zeki" },
    { value: "3", label: "Efe" },
    { value: "4", label: "Elif" },
    { value: "5", label: "Sibel" },
  ];
  return (
    <div>
      <Select
        options={options}
        value={options.filter(o => o.value === selected)}
      />
    </div>
  );
}
