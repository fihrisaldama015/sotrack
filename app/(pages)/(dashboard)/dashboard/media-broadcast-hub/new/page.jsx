"use client";

import { Close } from "@mui/icons-material";
import { Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AlertWarning from "../components/AlertWarningComponent";
import AddNewBroadcastForm from "./components/AddNewBroadcastFormComponent";

const MediaBroadCastHubNew = () => {
  const [recipient, setRecipient] = useState([]);
  const [email, setEmail] = useState("");

  const emailListener = (email) => {
    const splitEmail = email.split(" ");
    if (splitEmail.length > 1 && email.length > 1) {
      setRecipient([...recipient, email]);
      setEmail("");
      return;
    }
    setEmail(email);
  };

  useEffect(() => {
    let countdown;
    if (email != "" && recipient.length == 0) {
      countdown = setTimeout(() => {
        setRecipient([email]);
        setEmail("");
      }, 2000);
    }
    return () => clearTimeout(countdown);
  }, [email]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setRecipient((prev) => [...prev, email]);
      setEmail("");
    }
  };

  const removeEmailFromList = (id) => {
    const emailList = recipient.filter((email, index) => index !== id);
    setRecipient(emailList);
  };

  return (
    <Stack direction={"column"} spacing={3} className="bg-white p-6 rounded-lg">
      <AlertWarning
        title={"Cancel Broadcast"}
        message={`Are you sure you want to cancel your broadcast?`}
      />
      <Stack spacing={1.25}>
        <Typography className="font-semibold text-xl text-[#343A40]">
          Add New Broadcast
        </Typography>
        <Typography className="text-sm">
          Please fill in the following information to create a broadcast
          message.
        </Typography>
      </Stack>
      <Divider className="border-none h-[2px] bg-neutral-300" />
      <Stack spacing={2}>
        <Typography className="font-semibold text-base text-[#343A40]">
          Add Recipient
        </Typography>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          flexWrap={"wrap"}
          className="py-4 px-5 rounded-md ring-1 ring-grey-300 gap-4 transition-all duration-300 ease-in-out hover:ring-grey-800"
        >
          {recipient.map((email, id) => (
            <Stack
              key={id}
              direction={"row"}
              spacing={1}
              alignItems={"center"}
              className="py-1 px-3 bg-grey-300 animate-popup"
            >
              <Typography className="font-medium tracking-wide">
                {email}
              </Typography>
              <Close
                sx={{ width: 16 }}
                className="cursor-pointer hover:scale-150 transition-all"
                onClick={() => removeEmailFromList(id)}
              />
            </Stack>
          ))}
          <form className="relative flex flex-1 min-w-[200px]">
            <input
              type="text"
              value={email}
              onChange={(e) => emailListener(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              className="py-2 text-lg border-none w-full focus:outline-none rounded-md"
            />
          </form>
        </Stack>
      </Stack>
      <Typography className="font-semibold text-base text-[#343A40]">
        Broadcast
      </Typography>
      <AddNewBroadcastForm
        recipient={recipient.length == 0 ? recipient[0] : recipient.join(",")}
        resetRecipient={() => setRecipient([])}
      />
    </Stack>
  );
};

export default MediaBroadCastHubNew;
