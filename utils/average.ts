
export const GetAverage = (points: number): string => {
    const floored = Math.floor(points);

    if (900 >= floored && floored >= 823) return '1.0';
    if (822 >= floored && floored >= 805) return '1.1';
    if (804 >= floored && floored >= 787) return '1.2';
    if (786 >= floored && floored >= 769) return '1.3';
    if (768 >= floored && floored >= 751) return '1.4';
    if (750 >= floored && floored >= 733) return '1.5';
    if (732 >= floored && floored >= 715) return '1.6';
    if (714 >= floored && floored >= 697) return '1.7';
    if (696 >= floored && floored >= 679) return '1.8';
    if (678 >= floored && floored >= 661) return '1.9';
    if (660 >= floored && floored >= 643) return '2.0';
    if (642 >= floored && floored >= 625) return '2.1';
    if (624 >= floored && floored >= 607) return '2.2';
    if (606 >= floored && floored >= 589) return '2.3';
    if (588 >= floored && floored >= 571) return '2.4';
    if (570 >= floored && floored >= 553) return '2.5';
    if (552 >= floored && floored >= 535) return '2.6';
    if (534 >= floored && floored >= 517) return '2.7';
    if (516 >= floored && floored >= 499) return '2.8';
    if (498 >= floored && floored >= 481) return '2.9';
    if (480 >= floored && floored >= 463) return '3.0';
    if (462 >= floored && floored >= 445) return '3.1';
    if (444 >= floored && floored >= 427) return '3.2';
    if (426 >= floored && floored >= 409) return '3.3';
    if (408 >= floored && floored >= 391) return '3.4';
    if (390 >= floored && floored >= 373) return '3.5';
    if (372 >= floored && floored >= 355) return '3.6';
    if (354 >= floored && floored >= 337) return '3.7';
    if (336 >= floored && floored >= 319) return '3.8';
    if (318 >= floored && floored >= 301) return '3.9';
    if (floored == 300) return '4.0';
    return 'Failed';
}
