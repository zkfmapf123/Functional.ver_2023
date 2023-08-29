interface EventAttribute {
  target: {
    elements: {
      email: {
        value: 0;
      };
    };
  };
}

namespace example_1 {
  const mailing_list = [];

  // 1. 전역변수에 접근함
  const add_contact = (email: any) => {
    mailing_list.push(email);
  };

  const submit_form_handler = (event: EventAttribute) => {
    const form = event.target;
    const email = form.elements["email"].value;
    add_contact(email);
  };
}

namespace example_1_refactoring {
  const mailing_list: any[] = [];

  // 1. Copy-on-Write 반영
  const add_concat = (mailing_list: any[], email: any) => [
    ...mailing_list,
    email,
  ];

  // 역시 아직도 전역변수를 할당하긴 함... 문제가 있긴 있음
  const submit_form_handler = (event: EventAttribute) => {
    const form = event.target;
    const email = form.elements["email"].value;

    mailing_list.push(add_concat(mailing_list, email));
  };
}
