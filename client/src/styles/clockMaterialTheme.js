import { createTheme } from "@material-ui/core";

export const materialTheme = createTheme({
    overrides: {
        MuiFormControl: {
            root: {
                width: "100%",
            },
        },
        MuiInputLabel: {
            root: {
                fontSize: "1.2rem",
                fontWeight: 400,
                color: "black",
            },
        },
        MuiPickersToolbar: {
            root: {
                width: "100%",
            },
            toolbar: {
                backgroundColor: "rgba(229, 73, 65, 1)",
            },
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                backgroundColor: "white",
                color: "rgba(229, 73, 65, 1)",
            },
        },
        MuiPickersDay: {
            root: {
                color: "rgba(229, 73, 65, 1)",
                "&$disabled": {
                    color: "rgba(229, 73, 65, 1)",
                },
                "&$selected": {
                    backgroundColor: "rgba(229, 73, 65, 1)",
                },
            },
            today: {
                color: "rgba(229, 73, 65, 1)",
            },
        },
        MuiPickersModalDialog: {
            dialogAction: {
                color: "rgba(229, 73, 65, 1)",
            },
        },
        MuiOutlinedInput: {
            root: {
                "& $notchedOutline": {
                    borderColor: "rgba(229, 73, 65, 1)",
                    borderWidth: "1px",
                },
                "&:hover $notchedOutline": {
                    borderColor: "rgba(229, 73, 65, 1)",
                    borderWidth: "1px",
                },
                "&$focused $notchedOutline": {
                    borderColor: "rgba(229, 73, 65, 1)",
                    borderWidth: "1px",
                },
            },
            input: {
                borderColor: "rgba(229, 73, 65, 1)",
            },
        },
        MuiInputBase: {
            root: {
                backgroundColor: "rgba(229, 73, 65, 1)",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
            },
        },
    },
});
