"use client";

import React, { useState } from "react";
import DOMPurify from "isomorphic-dompurify";

import { useAddUserComment, useUserComments } from "@/hooks/use-user-comments";
import { Send, X } from "lucide-react";
import { useQueryState } from "nuqs";
import { toast } from "sonner";

import { formatTimeAgo } from "@/shared/lib";
import { Button } from "@/shared/ui/button";
import { DialogTitle } from "@/shared/ui/dialog";
import { Separator } from "@/shared/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
} from "@/shared/ui/sheet";
import Tiptap from "@/shared/ui/tiptap";

export function UserCommentSheet({
  onOpenChange,
  userId,
}: {
  onOpenChange: (open: boolean) => void;
  userId?: string;
}) {
  const [sheet, setSheet] = useQueryState("sheet", { defaultValue: "" });

  const { comments } = useUserComments(userId, sheet === "user-comment");
  const { addComment, isPending } = useAddUserComment(userId);
  const [content, setContent] = useState<string>("");

  const handleSend = () => {
    const text = content.replace(/<[^>]+>/g, "").trim();
    if (!text) {
      toast.error("Введіть коментар");
      return;
    }
    addComment(content, {
      onSuccess: () => {
        toast.success("Коментар додано");
        setContent("");
        setSheet("user-comment");
      },
      onError: (err: unknown) => {
        const message =
          typeof err === "object" && err && "message" in err
            ? String((err as { message?: string }).message)
            : undefined;
        toast.error(message || "Не вдалося додати коментар");
      },
    });
  };

  return (
    <Sheet open={sheet === "user-comment"} onOpenChange={onOpenChange}>
      <SheetContent className="min-w-[620px] [&>button]:hidden px-[24px] py-[20px]">
        <DialogTitle className="sr-only">Коментарі користувача</DialogTitle>
        <SheetHeader>
          <div className="flex items-center pb-3 border-b border-[#E0E0E0] justify-between">
            <div className="flex items-center gap-2">
              <SheetClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="shadow-none rounded-full  border  w-5  h-5  border-[#3A4754] text-[#3A4754]">
                  <X className="max-w-3 max-h-3" size={16} />
                </Button>
              </SheetClose>
              <p className="text-sm text-[#3A4754]">Закрити</p>
            </div>
          </div>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-4 flex-1 h-[calc(100vh-100px)] overflow-y-auto">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium text-[#3A4754]">Відповідь</h3>
            <Tiptap onChange={setContent} />
          </div>
          <div className="flex flex-row gap-2">
            <Button variant="BlackTransparent" size="lg" className="w-1/2">
              Відхилити
            </Button>
            <Button
              variant="balck"
              size="lg"
              type="button"
              className="w-1/2"
              onClick={handleSend}
              disabled={isPending}>
              <Send className="w-4 h-4 mr-2" />
              Надіслати
            </Button>
          </div>{" "}
          {comments && comments.length > 0 && (
            <div className="space-y-5">
              {comments.map(c => {
                const name =
                  c.createdBy?.displayName ||
                  c.createdBy?.email ||
                  "Користувач";
                const initial = name.trim().charAt(0).toUpperCase();
                return (
                  <React.Fragment key={c.id}>
                    <div className="text-[#3A4754]">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-[#EDEEF0] text-[#3A4754] flex items-center justify-center text-sm font-semibold">
                          {initial}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-medium">{name}</span>
                          <span className="text-xs text-[#6D7A87]">
                            {formatTimeAgo(c.createdAt)}
                          </span>
                        </div>
                      </div>
                      <div
                        className="text-base leading-relaxed text-[#3A4754]"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(c.text || ""),
                        }}
                      />
                    </div>
                    <Separator className="my-4" />
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
