# Mobile fix TODO

- [ ] Inspect remaining style.css sections for conflicting/overriding rules affecting:
  - [ ] Gallery images scaling
  - [ ] Guestbook layout structure on mobile
  - [ ] Nav bottom-left rounded corner
  - [ ] Index page title centering
- [ ] Implement targeted CSS fixes in `style.css`:
  - [ ] Ensure gallery slideshow height/width + image sizing behaves on small screens
  - [ ] Prevent guestbook message cards from overflowing / becoming misaligned
  - [ ] Remove unintended border-radius on nav corner (likely from `overflow-x:auto` or border-radius on links)
  - [ ] Center index hero/title text properly on mobile
- [ ] Test each page (index, guestbook, gallery, others) with mobile viewport widths (375px and 414px) in browser.

