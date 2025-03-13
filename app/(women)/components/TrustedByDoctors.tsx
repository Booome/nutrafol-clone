import Image from "next/image";

const DOCTORS = [
  {
    img: "https://images.ctfassets.net/0rbfqd9c4jdo/585ur1fd1oA7zWcShK8mZ1/86a694ad4e37ede99b5404e16dac1cc8/dr-julie-russak-headshot.jpg?fl=progressive",
    comment:
      "“Nutrafol is a necessary part of my hair growth protocol since I have personally seen the positive impact it can have on the hair health of my clients.”",
    name: "Dr. Julie Russak, M.D.",
    title: "FAAD Board-Certified Dermatologist",
  },
  {
    img: "https://images.ctfassets.net/0rbfqd9c4jdo/6hldBeYvwTu7m96P0zywF3/73ed4f41555f75711263bf2653d5cb6e/dr-jeanine-downie-headshot2.jpg?fl=progressive",
    comment:
      "“Quite frankly, I have never been a fan of any other hair or skin nutraceutical supplement before Nutrafol came along. This supplement really works, is consistent, and helps my patients from all races and ethnicities.”",
    name: "Dr. Jeanine Downie, M.D.",
    title: "Board-Certified Dermatologist",
  },
  {
    img: "https://images.ctfassets.net/0rbfqd9c4jdo/19QAzV3OWRb086Hi0zP5wM/85bb482c8736c6e52dd08e59a800cf22/dr-rawn-bosley-headshot.jpg?fl=progressive",
    comment:
      "“As a physician, it is important that I rely on science when making recommendations for my patients. The clinical studies are clear; it works. My patients have experienced overwhelming satisfaction with Nutrafol, noting significant improvements in visible hair thickness and growth.”",
    name: "Dr. Rawn Bosley, M.D.",
    title: "Double Board-Certified Dermatologist",
  },
];

export function TrustedByDoctors() {
  return (
    <section className="max-w-[var(--width-max)] mx-auto bg-base-100 text-center px-6 md:px-8 lg:px-12 xl:px-28 pt-10 md:pt-14 lg:pt-25 xl:pt-36">
      <div className="md:flex md:items-center md:justify-between md:px-4">
        <h2 className="text-[28px] md:text-4xl lg:text-5xl xl:text-6xl font-serif">
          Trusted by <em>Doctors</em>
        </h2>

        <div className="mt-8 md:mt-0">
          <p className="text-xs md:text-[13px] lg:text-sm font-semibold">
            #1 Dermatologist-Recommended
          </p>
          <p className="text-xs md:text-[13px] lg:text-sm mt-1 text-base-content/50">
            Hair Growth Supplement Brand
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row border-t lg:border-t-0 lg:border-l border-base-content/10 mt-8 lg:mt-16">
        {DOCTORS.map((doctor) => (
          <div
            key={doctor.name}
            className="flex lg:flex-col lg:w-1/3 items-start px-3 lg:px-6 py-6 border-b lg:border-b-0 lg:border-r border-base-content/10"
          >
            <Image
              src={doctor.img}
              alt={doctor.name}
              width={200}
              height={200}
              className="w-42 md:w-58 lg:w-full h-32 md:h-42 object-cover rounded"
            />

            <div className="ml-6 lg:ml-0 lg:mt-8 lg:w-full min-h-32 md:min-h-42 lg:min-h-105 text-left text-sm flex flex-col justify-between gap-8">
              <p className="md:text-base lg:text-xl">{doctor.comment}</p>
              <div>
                <p className="font-semibold text-xs md:text-[13px] lg:text-sm">
                  {doctor.name}
                </p>
                <p className="text-base-content/50 text-xs mt-1">
                  {doctor.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs my-6 lg:my-4 text-base-content/50">
        Expert partners compensated for their opinion and experience.
      </p>
    </section>
  );
}
