import useListController, {
    ListProps,
    ListControllerProps,
} from './useListController';
import { useTranslate } from '../i18n';
import { Translate } from '../types';
import { useResourceContext, useResourceDefinition } from '../core';

interface ListControllerComponentProps extends ListControllerProps {
    translate: Translate;
}

interface Props extends ListProps {
    children: (params: ListControllerComponentProps) => JSX.Element;
}

/**
 * Render prop version of the useListController hook.
 *
 * @see useListController
 * @example
 *
 * const ListView = () => <div>...</div>;
 * const List = props => (
 *     <ListController {...props}>
 *        {controllerProps => <ListView {...controllerProps} {...props} />}
 *     </ListController>
 * )
 */
const ListController = ({ children, ...props }: Props) => {
    const { resource } = useResourceContext(props);
    const { hasCreate } = useResourceDefinition(resource, props);
    // @deprecated. hasCreate is injected for backward compatibility
    const controllerProps = useListController({
        resource,
        hasCreate,
        ...props,
    });
    // @deprecated. injected for backward compatibility
    const translate = useTranslate();
    return children({ translate, ...controllerProps });
};

export default ListController;
