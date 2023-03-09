import {
  Button,
  EnumButtonStyle,
  Icon,
  TextInput,
} from "@amplication/design-system";
import React, { useState } from "react";

import "./CreateServiceRepository.scss";

import "../CreateServiceWizard.scss";

const CreateServiceRepository: React.FC<{ moduleClass: string }> = ({
  moduleClass,
}) => {
  const [chooseOption, setChooseOPtion] = useState<string>("Monorepo");

  const handleOptionChoose = (event) => {
    setChooseOPtion(event.target.innerText);
  };

  return (
    <div className={`${moduleClass}__splitWrapper`}>
      <div className={`${moduleClass}__left`}>
        <div className={`${moduleClass}__service_name_header`}>
          <h2>Are you using a monorepo or polyrepo?</h2>
        </div>
        <div className={`${moduleClass}__description_bottom`}>
          <h3>
            If you are using a monorepo, you can select the folder where you
            want to save the code of the service. “apps”, “packages”,
            “ee/packages” all are valid. Otherwise, Amplication will push the
            code to the root of the repo in separate folders for the server and
            the admin-ui.
          </h3>
        </div>
      </div>
      <div className={`${moduleClass}__right`}>
        <div className={`${moduleClass}__repo_wrapper`}>
          <div className={`${moduleClass}__repository_box`}>
            <div className={`${moduleClass}__repository_options`}>
              <div className={`${moduleClass}__repository_btn`}>
                <Button
                  buttonStyle={EnumButtonStyle.Clear}
                  onClick={handleOptionChoose}
                >
                  Monorepo
                </Button>
                <div className={`${moduleClass}__repository_btn_text`}>
                  Generate the service into a folder next to other services in
                  the repository
                </div>
              </div>
              <div className={`${moduleClass}__repository_btn`}>
                <Button
                  buttonStyle={EnumButtonStyle.Clear}
                  onClick={handleOptionChoose}
                >
                  Polyrepo
                </Button>
                <div className={`${moduleClass}__repository_btn_text`}>
                  Generate the services into the root of the repository
                </div>
              </div>
            </div>
            <div className={`${moduleClass}__repository_base_dir`}>
              <TextInput name="base directory" label="base directory" />
            </div>
          </div>
          <hr className={`${moduleClass}__repo_hr`}></hr>
          <div className={`${moduleClass}__monorepo`}>
            <div className={`${moduleClass}__monorepo_title`}>
              Your project will look like this:
            </div>
            {chooseOption === "Monorepo" ? (
              <div className={`${moduleClass}__monorepo_example`}>
                <div className={`${moduleClass}__monorepo_example_app`}>
                  <Icon icon={"folder"}></Icon>
                  apps
                </div>
                <div className={`${moduleClass}__monorepo_example_tree`}>
                  <hr className={`${moduleClass}__monorepo_hr`}></hr>
                  <div
                    className={`${moduleClass}__monorepo_example_tree_folders`}
                  >
                    <div className={`${moduleClass}__monorepo_box_folder`}>
                      <Icon icon={"folder"}></Icon>
                      example-service
                    </div>
                    <div className={`${moduleClass}__monorepo_box_folder`}>
                      <Icon icon={"folder"}></Icon>
                      example-service-admin
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`${moduleClass}__monorepo_example`}>
                <div
                  className={`${moduleClass}__monorepo_example_tree_folders`}
                >
                  <div className={`${moduleClass}__monorepo_box_folder`}>
                    <Icon icon={"folder"}></Icon>
                    example-service
                  </div>
                  <div className={`${moduleClass}__monorepo_box_folder`}>
                    <Icon icon={"folder"}></Icon>
                    example-service-admin
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateServiceRepository;
