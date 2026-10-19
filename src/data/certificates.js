// Certificate gallery. NEVER fabricate titles, dates, IDs, or links.
// To publish a certificate image:
//   1. Drop the file into public/images/certificates/.
//   2. Set `file: '/images/certificates/<filename>'` (single image) or add
//      entries to `files: [{ label, src }]` (multiple images on one card).
//   3. Fill in the verified `date` if present on the certificate.
// If a credential only exists on a website, set `link: 'https://…'`.
// Cards with no file and no link render as clean text cards — that is fine.
export const certificates = [
  {
    id: 'bano-qabil-web-development',
    title: 'Web Development Certificate',
    issuer: 'Bano Qabil Sahiwal',
    date: null,
    description:
      'Completed web development training focused on building and styling websites, creating responsive layouts, and understanding the fundamentals of frontend development. The learning experience included HTML, CSS, JavaScript, and practical website development concepts.',
    file: null, // '/images/certificates/bano-qabil-web-development.png'
    link: null,
  },
  {
    id: 'unithena-basic-python',
    title: 'Basic Python',
    issuer: 'UniAthena',
    date: null,
    description:
      'Learned the fundamentals of Python programming, including variables, data types, operators, conditional statements, loops, functions, and basic problem-solving concepts. This learning experience helped build a foundation for writing and understanding Python programs.',
    file: null, // '/images/certificates/unithena-basic-python.png'
    link: null,
  },
  {
    id: 'pjri-webinars',
    title: 'Webinar Participation & Certificates',
    issuer: 'Pakistan Justice and Right Initiative (PJRI)',
    date: null,
    count: 2,
    description:
      'Participated in webinar-based learning activities organized by Pakistan Justice and Right Initiative (PJRI) and received two certificates associated with the organization.',
    // Add both certificate images here to show two labeled preview buttons:
    files: [
      // { label: 'Certificate 1', src: '/images/certificates/pijr-certificate-1.png' },
      // { label: 'Certificate 2', src: '/images/certificates/pijr-certificate-2.png' },
    ],
    link: null,
  },
  {
    id: 'anthropic-claude',
    title: 'Anthropic Learning Credential',
    issuer: 'Anthropic',
    date: null,
    description:
      'Explored AI-related learning resources and concepts associated with Anthropic. This learning experience contributed to my understanding of modern AI tools and their potential applications.',
    file: null, // '/images/certificates/anthropic-claude.png'
    link: null,
  },
  {
    id: 'alkhidmat-internship',
    title: 'Volunteer Internship Certificate',
    issuer: 'Alkhidmat Pakistan',
    date: '2026',
    description:
      'Recognizes my volunteer internship experience with Alkhidmat Pakistan. This experience represents my involvement in a volunteer-oriented environment and my commitment to learning, responsibility, and community service.',
    file: null, // '/images/certificates/alkhidmat-internship.png'
    link: null,
  },
]
