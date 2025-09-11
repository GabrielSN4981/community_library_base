import nodeCron from "node-cron";
import moment from "moment";
import sendEmail from "./email.service.js";
import loanRepository from "../repositories/loan.repository.js";

nodeCron.schedule("0 9 * * *", async () => {
  const loans = await loanRepository.findAllLoansRepository();
  const today = moment().startOf("day");

  loans.forEach(async (loan) => {
    const dueDate = moment(loan.dueDate).startOf("day");
    const reminderDueDate = moment(dueDate).subtract(1, "days");
    if (today.isSame(reminderDueDate)) {
      sendEmail(userLoan.email, bookLoan.title, loan.dueDate);
    }
  });
});
