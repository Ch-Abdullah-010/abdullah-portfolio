CERTIFICATE IMAGES — WHERE TO PUT YOUR FILES
===========================================

Drop your certificate image files (PNG or JPG) into THIS folder
(public/images/certificates/) using EXACTLY these filenames:

  bano-qabil-web-development.png   <- Bano Qabil Sahiwal — Web Development
  unithena-basic-python.png        <- UniAthena — Basic Python
  pijr-certificate-1.png           <- PJRI webinar certificate #1
  pijr-certificate-2.png           <- PJRI webinar certificate #2
  anthropic-claude.png             <- Anthropic learning credential
  alkhidmat-internship.png         <- Alkhidmat Pakistan volunteer internship

THEN, in src/data/certificates.js, for each certificate:

  SINGLE-image card (all except PJRI):
      file: null  ->  file: '/images/certificates/<filename>'

  PJRI card (two certificates on ONE card):
      uncomment the two entries under `files: [...]`:
        { label: 'Certificate 1', src: '/images/certificates/pijr-certificate-1.png' },
        { label: 'Certificate 2', src: '/images/certificates/pijr-certificate-2.png' },

Each entry with a `src` automatically gets its own labeled
"View Certificate" preview button on the card. No other code changes needed.
Cards with no file and no link render as clean text cards — that is fine.

TIPS
- Photos of certificates are fine; make sure the text is legible.
- Keep each image under about 1 MB for fast loading.
- If a credential only exists on a website (no image), set `link:` to the
  official URL instead — a "Verify Credential" button will appear.
- You can also fill in the verified `date:` in the same file.
