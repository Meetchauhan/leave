import { useFormik } from "formik";
import { LeaveScheme } from "../../schemas";
import { useState } from "react";
import moment from "moment";
import deleteIcon from "../../images/remove.svg";

export default function LeaveForm() {
  const [numOfDatePicker, setNumOfDatePicker] = useState([""]);
  const [leaveData, setLeaveData] = useState([]);

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    enableReinitialize: true,
    initialValues: {
      days: "",
      startDate: "",
      holidays: numOfDatePicker,
      saturday: false,
      sunday: false,
    },
    validationSchema: LeaveScheme,
    validateOnChange: true,
    onSubmit: (values, action) => {
      setLeaveData([...leaveData, values]);
      action.resetForm();
    },
  });

  function handleClickHolidays() {
    if (numOfDatePicker.length <= 10) {
      setNumOfDatePicker([...numOfDatePicker, ""]);
    }
  }

  function handleDeleteHolidays(ID) {
    const tempList = [...numOfDatePicker];
    tempList.splice(ID, 1);
    setNumOfDatePicker(tempList);
  }

  const DATE_FORMATE = "YYYY/MM/DD";

  function totalLeave(values) {
    const userLeaveDates = [];
    var startDate = moment(values.startDate, DATE_FORMATE);

    while (userLeaveDates.length < values.days) {
      // console.log("startdate", startDate.format(DATE_FORMATE));
      // console.log("userLeavedate", userLeaveDates);
      var isValidLeave = true;
      if (values.holidays.includes(startDate.format(DATE_FORMATE))) {
        // console.log("isHoliday", startDate.format(DATE_FORMATE));
        isValidLeave = false;
      }
      if (values.saturday) {
        if (startDate.format("dddd") === "Saturday") {
          // console.log("isSaturday", startDate.format("dddd"));
          isValidLeave = false;
        }
      }

      if (values.sunday) {
        if (startDate.format("dddd") === "Sunday") {
          // console.log("isSunday", startDate.format("dddd"));
          isValidLeave = false;
        }
      }
      if (isValidLeave) {
        userLeaveDates.push(startDate.format(DATE_FORMATE));
      }
      startDate.add(1, "days");
    }
    return userLeaveDates.join(", ");
  }

  return (
    <>
      <div className="container">
        <div className="inner">
          <form onSubmit={handleSubmit}>
            <div className="days data-input">
              <label htmlFor="days" className="input-label">
                Number of Days
              </label>
              <br />
              <input
                type="number"
                autoComplete="off"
                name="days"
                id="days"
                value={values.days}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.days ? <p className="form-error">{errors.days}</p> : null}
            </div>
            <div className="startDate data-input">
              <label htmlFor="startDate" className="input-label">
                Start Date
              </label>
              <br />
              <input
                type="date"
                autoComplete="off"
                name="startDate"
                id="startDate"
                value={values.startDate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.startDate ? (
                <p className="form-error">{errors.startDate}</p>
              ) : null}
            </div>
            <div className="holidays data-input">
              <label htmlFor="holidays" className="input-label">
                Company Holidays
              </label>
              <br />
              {values.holidays.map((item, index) => (
                <div className="deleteHoliday">
                  <input
                    key={index}
                    type="date"
                    name="holidays"
                    id="holidays"
                    value={item}
                    onChange={(e) => {
                      console.log("value" + e.target.value);
                      const tempList = [...numOfDatePicker];
                      tempList[index] = e.target.value;
                      setNumOfDatePicker(tempList);
                    }}
                  />
                  {numOfDatePicker.length > 1 && (
                    <img
                      src={deleteIcon}
                      alt="delete-icon"
                      onClick={() => handleDeleteHolidays(index)}
                    />
                  )}
                </div>
              ))}
              {errors.holidays ? (
                <p className="form-error">{errors.holidays}</p>
              ) : null}
              <button
                type="button"
                className="add"
                onClick={handleClickHolidays}
              >
                + Add
              </button>
            </div>
            <div className="weekEnd data-input">
              <input
                type="checkbox"
                autoComplete="off"
                name="saturday"
                id="saturday"
                value={!values.saturday ? "Yes" : "No"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="saturday" className="week">
                Saturday
              </label>
              <br />

              <input
                type="checkbox"
                autoComplete="off"
                name="sunday"
                id="sunday"
                value={!values.sunday ? "Yes" : "No"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="sunday" className="week">
                Sunday
              </label>
              {errors.saturday ? (
                <p className="form-error">{errors.saturday}</p>
              ) : null}
            </div>
            <div className="saveBtn data-input">
              <button className="save" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      {leaveData.length > 0 && (
        <div className="result">
          <div className="container">
            <div className="resultInner">
              {leaveData.map((item, index) => {
                return (
                  <div key={index} className="result-item">
                    <div className="wrapper">
                      <div>
                        <div className="label">Start Date</div>
                        <div className="item">
                          {moment(item.startDate, DATE_FORMATE).format(
                            DATE_FORMATE
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="label">Total Number of Leave Days</div>
                        <div className="item">{item.days}</div>
                      </div>
                    </div>
                    <div className="weekEndsWorking">
                      <div className="label">WorkingDays</div>
                      <div className="item">
                        Saturday Working :{" "}
                        <span
                          style={
                            item.saturday
                              ? { color: "green" }
                              : { color: "red" }
                          }
                        >
                          {item.saturday ? "Yes" : "No"}
                        </span>
                      </div>
                      <div className="item">
                        Sunday Working :{" "}
                        <span
                          style={
                            item.sunday ? { color: "green" } : { color: "red" }
                          }
                        >
                          {item.sunday ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>
                    <div className="label">Leave Days</div>
                    <div className="item">{totalLeave(item)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
