# insert-web-app-name

This README file is temporarily dedicated to contributors working on the project. This README file will soon be replaced with an actual README file once the project is nearing its completion

Also diay gi-setup na ni @rokkunbruv (aka Christian Brillos) ang structure daan based on the MERN tutorial for organization's sake and para dali na ang pag-add2 or smth

[Link to the docs](https://docs.google.com/document/d/1zIDrU1uYWzleQUaXnjouecMgEnFCZ0jUP0V7jofI3W0/edit?fbclid=IwZXh0bgNhZW0CMTAAAR03K9B3fFPVtQ_SiJonfe5coo-7l9vASbr6Q6qdNsMX7SvvhqPHE4xCt_w_aem_920uIupYcbpHL-GkY5cgnA)

## How to setup the repository in VSCode

_**Note:** This is specific to VSCode only. If you are using a different code editor/IDE, please refer to a tutorial or guide specific to your editor/IDE._

Before you begin Step 1, dapat ma-add namo as contributors sa repo para lahos na inyong changes sa kani na repo. If wala pamo na-add as contributors, kindly provide your Github username sa gc

1. Create a Github account and install Git in your system, if you haven't already. If wala pa, you can refer to [this tutorial on setting up Git](https://www.youtube.com/watch?v=2j7fD92g-gE). Focus lang sa parts where they installed Git and Git Bash and configured their Github username and email.
2. In VSCode, enter `Ctrl+Shift+P` to open Command Palette. Enter `Git: Clone` sa iyang text bar or just select it sa iyang drop-down if naa. Then select `Clone from Github`
3. Enter `rokkunbruv/bill-splitter-web-app` sa kanang text bar
4. Select a destination on where you wanna store the repo
5. If naay mu-prompt na _"Would you like to open the cloned repository?"_, just click either _Open_ or _Open in New Window_
6. The setup is done! Please refer to Step 7 onwards on how to save/commit your changes to the repo
7. Try adding one file or folder sa `Explorer` view
8. In VSCode, click `Source Control` on the left taskbar. Naa siya ubos sa magnifying glass na icon and it looks like three small circles connected by curvy lines. It's also the third icon sa taskbar
9. In `Source Control`, you can see a text bar na naay _"Message (Ctrl+Enter to...)"_. Enter _test commit_ sa kana na text bar.
10. Press the `Commit` button to commit your changes. After, press `Sync Changes` button to add it to main/whatever branch you are on.
11. Please delete the file/folder you just added and do the same commit and sync changes process you did in Steps 7 to 9

Now you are ready to go! This is assuming na you already have Node.js installed. Kamo nay bahala ug setup ana ug add sa necessary dependencies using `npm install whatever-dependency`, of course, either sa client or server na folder

## Push, Pull, Commit

Please refer to [this tutorial on push and commit](https://www.youtube.com/watch?v=lYiE5lBS13E) and [this tutorial on pull](https://www.youtube.com/watch?v=hyLAfceeM1E)

You'll want to pull to your current branch if there are changes made by your partner kumbaga (makita ra na siya sa imong `Source Control`)

## Git Branches

### How To

You can refer to [this tutorial on Github branches](https://www.youtube.com/watch?v=SD7YNLv5Evc) to know how Git branches work and how you can make/manage one and stuff like that.

### Guidelines

Please refer to the following in managing Git branches:

- Chat lang sa gc if naa moy i-implement na feature so that @rokkunbruv (aka Christian Brillos) can make a Github issue for you **OR** ikaw na lang maghimo sa issue (dapat ang name sa issue kay unsa nga feature ang imo i-implement. try to be specific as possible). Please refer to [this tutorial on Github issues](https://www.youtube.com/watch?v=TKJ4RdhyB5Y) on how to create/manage Github issues.
- Each issue has its own corresponding Git branch where you can commit your changes. To create a branch for your issue, refer to [this tutorial on adding a branch to a Github issue](https://www.youtube.com/shorts/FJet4ySW_Ek)
- Please commit your changes in your designated branch (depending sa unsa na feature imong i-implement). **NEVER** commit to the `main` branch (unless nahan mo mu-update sa README or any other reason then pwede ra).
- If you're sure na ang imong i-implement na feature kay mana and error-free, please create a pull request para ma-merge siya sa `main` branch ni master @conxant0 (aka Jezreel Chad)

If you have any inquiries, concerns, and violent reactions regarding this mini-guide, let @rokkunbruv (aka Christian Brillos) know so that he can change this README file for everyone to see sad tenkssssss  
