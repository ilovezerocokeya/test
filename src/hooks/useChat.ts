import { useState, useEffect, useRef, FormEvent, KeyboardEvent } from "react";
import { useUser } from "@/provider/UserContextProvider";
import { createClient } from "@/utils/supabase/client";
import { MessageRow } from "@/types/chats/Chats.type";

const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const useChat = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const chatContentDivRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const supabase = createClient();

    const getAllMessages = async () => {
      const { data: messages, error } = await supabase
        .from("Messages")
        .select(`*, Users (nickname, profile_image_url)`)
        .order("sent_at", { ascending: true });

      if (error) {
        console.error(error);
        return;
      }

      setMessages(messages as MessageRow[]);

      if (chatContentDivRef.current) {
        requestAnimationFrame(() => {
          chatContentDivRef.current!.scrollTop = chatContentDivRef.current!.scrollHeight;
        });
      }
    };

    getAllMessages();

    const openTalkSubscription = supabase
      .channel("openTalk")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Messages",
        },
        () => {
          getAllMessages();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "Messages",
        },
        () => {
          getAllMessages();
        },
      )
      .subscribe();

    return () => {
      openTalkSubscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (evt?: FormEvent<HTMLFormElement>) => {
    evt?.preventDefault();

    if (!user) {
      return;
    } else if (formRef.current && inputValue.trim()) {
      const supabase = createClient();

      const { error } = await supabase
        .from("Messages")
        .insert({
          channel_id: "214322ba-1cbd-424c-9ef1-e4b281f71675",
          user_id: `${user.id}`,
          content: inputValue,
        })
        .select("*");

      if (error) {
        console.error("에러: ", error);
        return;
      }

      setInputValue("");
    }
  };

  const debouncedSubmit = debounce(handleSubmit, 300);

  const handleEnterKeyDown = (evt: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!evt.shiftKey && evt.key === "Enter") {
      evt.preventDefault();
      if (formRef.current && inputValue.trim()) {
        debouncedSubmit();
      } else {
        return;
      }
    }
  };

  const handleDelete = async (message_id: string) => {
    const supabase = createClient();

    const { error } = await supabase.from("Messages").delete().eq("message_id", message_id);

    if (error) {
      console.error("에러: ", error);
      return;
    }
  };

  return {
    user,
    messages,
    inputValue,
    setInputValue,
    isModalOpen,
    setIsModalOpen,
    chatContentDivRef,
    formRef,
    handleSubmit,
    handleEnterKeyDown,
    handleDelete,
  };
};

export default useChat;
