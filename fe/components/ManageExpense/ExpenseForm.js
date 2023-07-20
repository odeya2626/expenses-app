import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";
import Btn from "../UI/Btn";

export default function ExpenseForm({
  onCancel,
  onSubmit,
  isEditMode,
  defaultValues,
}) {
  const [date, setDate] = useState(() => {
    const defaultDate = defaultValues?.date
      ? new Date(Date.parse(defaultValues.date))
      : null;
    return defaultDate || new Date();
  });
  const [showDatePicker, setShowDatePicker] = useState(false); // for date picker
  const [formState, setFormState] = useState({
    amount: {
      value: defaultValues?.amount?.toString() || "",
      isValid: true,
    },
    date: {
      value: defaultValues?.date || new Date().toISOString(),
      isValid: true,
    },
    title: {
      value: defaultValues?.title || "",
      isValid: true,
    },
  });
  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setShowDatePicker(false);
    setDate(currentDate);
    handleFormChange("date", currentDate.toISOString());
  };
  const handleFormChange = (inputKey, enteredValue) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        [inputKey]: { value: enteredValue, isValid: true },
      };
    });
  };
  const handleSubmit = () => {
    const expenseData = {
      amount: parseFloat(formState.amount.value),
      date: formState.date.value,
      title: formState.title.value,
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const titleIsValid = expenseData.title.trim().length > 0;
    if (!amountIsValid || !dateIsValid || !titleIsValid) {
      setFormState((prevState) => {
        return {
          ...prevState,
          amount: { ...prevState.amount, isValid: amountIsValid },
          date: { ...prevState.date, isValid: dateIsValid },
          title: { ...prevState.title, isValid: titleIsValid },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !formState.amount.isValid ||
    !formState.date.isValid ||
    !formState.title.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!formState.amount.isValid}
          textInputConfig={{
            KeyboardType: "decimal-pad",
            value: formState.amount.value,
            onChangeText: handleFormChange.bind(this, "amount"),
          }}
        />
        <TouchableOpacity onPress={handleShowDatePicker}>
          <Input
            style={styles.rowInput}
            label="Date"
            invalid={!formState.date.isValid}
            textInputConfig={{
              // placeholder: "YYYY-MM-DD",
              maxLength: 10,
              value: date.toISOString().slice(0, 10),
              onChangeText: handleFormChange.bind(this, "date"),
              editable: false,
              selectTextOnFocus: false,
            }}
          />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            is24Hour={true}
            onChange={handleDateChange}
          />
        )}
      </View>

      <Input
        label="Description"
        invalid={!formState.title.isValid}
        textInputConfig={{
          multiline: true,
          // autoCorrect:false,
          value: formState.title.value,
          onChangeText: handleFormChange.bind(this, "title"),
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid Input: Please check your entered data.
        </Text>
      )}
      <View style={styles.buttons}>
        <Btn mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Btn>
        <Btn mode="flat" onPress={handleSubmit} style={styles.button}>
          {isEditMode ? "Update" : "Add"}
        </Btn>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary0,
    textAlign: "center",
    marginVertical: 10,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 100,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error,
    marginVertical: 6,
  },
});
