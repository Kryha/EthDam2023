import { Button, Slider, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

type MessageContent = { amount: number; message: string; username: string };

export const postMessage = async ({
  message,
  special,
}: {
  message: string;
  special: boolean;
}): Promise<boolean> => {
  const response = await axios.post("api/message", { message, special });
  return response.data;
};

export const Form = () => {
  const { mutate: post } = useMutation(postMessage);
  const formMethods = useForm<MessageContent>({ mode: "onChange" });
  const { register, handleSubmit } = formMethods;

  const onSubmit = ({ message, amount }: MessageContent) => {
    post({ message: message, special: amount > 0 });
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={3}
      sx={{
        flexGrow: 1,
        maxHeight: 140,
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        pt: 1,
        pb: 2,
      }}
    >
      <Stack direction="row" justifyContent="space-between" sx={{ width: 1 }}>
        <TextField
          {...register("message")}
          name="message"
          id="standard-basic"
          label="Write something"
          variant="standard"
        />
        <Button variant="contained" color="secondary" type="submit">
          Send
        </Button>
      </Stack>
      <Slider
        {...register("amount")}
        color="secondary"
        name="amount"
        defaultValue={1}
        step={1}
        marks
        min={0}
        valueLabelDisplay="auto"
        max={10}
      />
    </Stack>
  );
};
