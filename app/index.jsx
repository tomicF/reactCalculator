import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const buttons = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "0",
  "-",
  "C",
  "=",
  "+/-",
  "*",
  "/",
];

let plus = false;
let minus = false;
let times = false;
let devide = false;
let previusValue = 0;

export default function CalculatorScreen() {
  const [counter, setCounter] = useState(0); // Initial state

  const buttonPressed = (label) => {
    let sum = counter + label;
    sum = parseInt(sum);
    setCounter(sum);
    console.log("sum: " + sum);
    console.log("prev: " + previusValue);

    if (label === "+/-") {
      sum = sum * -1;
      setCounter(sum);
      return;
    }

    if (label === "*") {
      if (times) {
        previusValue *= counter;
      } else {
        previusValue = counter;
      }
      times = true;
      setCounter(0);
      return;
    }
    if (label === "/") {
      if (devide) {
        previusValue /= counter;
      } else {
        previusValue = counter;
      }
      devide = true;
      setCounter(0);
      return;
    }

    if (devide === true && label === "=") {
      const result = previusValue / counter;
      previusValue = 0;
      setCounter(result);
      devide = false;
      return;
    }

    if (times === true && label === "=") {
      const result = previusValue * counter;
      previusValue = 0;
      setCounter(result);
      times = false;
      return;
    }

    if (label === "C") {
      setCounter(0);
      previusValue = 0;
      plus = false;
      minus = false;
      return;
    }

    if (plus == true && label === "=") {
      sum += previusValue;
      previusValue = 0;
      setCounter(sum);
      plus = false;
      return;
    }

    if (label === "+") {
      plus = true;
      previusValue += sum;
      setCounter(0);
      return;
    }

    if (minus == true && label === "=") {
      sum = previusValue - sum;
      previusValue = 0;
      setCounter(sum);
      minus = false;
      return;
    }

    if (label === "-") {
      if (minus === false) {
        previusValue = sum;
      } else {
        previusValue -= sum;
      }
      minus = true;
      setCounter(0);
      return;
    }
  };

  return (
    <View style={{ marginTop: 50 }}>
      <View style={styles.sumTextContainer}>
        <Text style={styles.sumText}>{counter}</Text>
      </View>
      <View style={styles.container}>
        {buttons.map((label, index) => (
          <TouchableOpacity
            key={index}
            style={styles.buttonContainer}
            onPress={() => buttonPressed(label)}
          >
            <Text style={styles.buttonText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 50,
  },
  buttonText: {
    fontSize: 50,
    color: "white",
    textAlign: "center",
  },
  buttonContainer: {
    width: 100,
    height: 70,
    backgroundColor: "blue",
    borderRadius: 10,
    margin: 5,
  },
  sumText: {
    fontSize: 50,
    color: "black",
    textAlign: "right",
  },
  sumTextContainer: {
    width: 320,
    height: 70,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 100,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
